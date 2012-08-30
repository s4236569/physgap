{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}

import BasicPrelude
import Hakyll

import Control.Arrow ( (>>>) )

config :: HakyllConfiguration
config = HakyllConfiguration
    { destinationDirectory = "www"
    , storeDirectory       = "cache"
    , ignoreFile           = (\p -> False)
    , deployCommand        = "echo 'no deployment method yet'"
    , inMemoryCache        = True
    }

main :: IO ()
main = hakyllWith config $ do

  -- route styles
  match "styles/**" $ do
    route idRoute
    compile copyFileCompiler

  -- route scripts
  match "scripts/*.js" $ do
    route idRoute
    compile copyFileCompiler

  -- route static
  match "static/**.png" $ do
    route idRoute
    compile copyFileCompiler

  --route phonegap icon
  match "icon.png" $ do
    route idRoute
    compile copyFileCompiler

  -- index
  match "index.html" $ route idRoute
  create "index.html" $ constA mempty 
    >>> applyTemplateCompiler "templates/index.hamlet"

  match "PHYS1171.html" $ route idRoute
  create "PHYS1171.html" $ constA mempty 
    >>> applyTemplateCompiler "templates/PHYS1171.hamlet"

  match "content/*.md" $ do
    route .setExtension $ ".html"
    compile (pageCompiler >>> applyTemplateCompiler "templates/page.hamlet")

  -- config.xml
  match "config.xml" $ route idRoute
  create "config.xml" $ constA mempty 
    >>> applyTemplateCompiler "templates/config.xml"

  -- read templates
  match "templates/*" $ compile templateCompiler
