{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}

import BasicPrelude
import Hakyll

import Control.Arrow ( (>>>) )
import Text.Pandoc

config :: HakyllConfiguration
config = HakyllConfiguration
    { destinationDirectory = "www"
    , storeDirectory       = "cache"
    , ignoreFile           = \p -> False
    , deployCommand        = "echo 'no deployment method yet'"
    , inMemoryCache        = True
    }

-- pandocWriter :: WriterOptions
-- pandocWriter = defaultWriterOptions
--   { writerHTMLMathMethod = MathJax "scripts/mathjax/MathJax.js"}

main :: IO ()
main = hakyllWith config $ do

  -- route styles
  match "styles/**" $ do
    route idRoute
    compile copyFileCompiler

  -- route scripts
  match "scripts/**" $ do
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

  match "content/**.png" $ do
    route idRoute
    compile copyFileCompiler

  -- config.xml
  match "config.xml" $ route idRoute
  create "config.xml" $ constA mempty 
    >>> applyTemplateCompiler "templates/config.xml"

  -- read templates
  match "templates/*" $ compile templateCompiler
