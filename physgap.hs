{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}

import BasicPrelude hiding ( group, groupBy )
import Control.Arrow ( (>>>), (|||), arr, returnA )
import Text.Pandoc
import Hakyll
import Helpers

config :: HakyllConfiguration
config = defaultHakyllConfiguration 
    { destinationDirectory = "www"
    , storeDirectory       = "cache"
    }

pandocWriter :: WriterOptions
pandocWriter = defaultWriterOptions
  { writerHTMLMathMethod = MathJax "scripts/mathjax/MathJax.js"}

-- Patterns
allMD = "content/**.md"
isContent = allMD ++ predicate (not . isParent)
isMenu = allMD ++ predicate isParent

-- load all the templates
loadTemplates = match "templates/*" $ compile templateCompiler

-- use pandoc to markup all markdown content
markupMarkdown = match allMD . group "marked-down" $ 
  compile $ pageCompilerWith defaultHakyllParserState pandocWriter

-- take content, handle equations and build page
buildContentPages = match isContent . group "content-pages" $ do
    ds <- resources
    forM_ ds $ \d -> 
      create d $ (require_ . depI $ d) >>> arr isEquations
        >>> (mathjaxA ||| arr (setField "mathjax" ""))
        >>> addValidId
        >>> applyTemplateCompiler "templates/content.hamlet"
  where 
    depI = setGroup (Just "marked-down")
    mathjaxA = arr (\p -> (p, p)) >>> setFieldA "mathjax" loadJaxScript
    isEquations p
      | getField "equations" p == "true" = Left p
      | otherwise = Right p

      
-- create menu items for all content including menus
buildMenuItems = match allMD . group "menu-items" $ do
    ds <- resources
    forM_ ds $ \d -> 
      create d $ (require_ . depI $ d)
        >>> (arr (getField "title") &&& arr validId)
        >>> arr li
        >>> arr fromBody
  where
    depI = setGroup (Just "marked-down")
    li (n,v) = "<li><a href=\"#"++v++"\">"++n++"</a></li>"
    

-- get menu content, the menu items and build menu
buildMenuPages = match isMenu . group "menu-pages" $ do 
    ds <- resources
    forM_ ds $ \d -> 
      create d $ (require_ . depI $ d) &&& returnA
        >>> setMenuArrow d
        >>> addValidId
        >>> applyTemplateCompiler "templates/menu.hamlet"
  where 
    depI = setGroup (Just "marked-down")
    grpI d = inGroup (Just "menu-items") ++ predicate (inMenu d) 
    setMenuArrow d = setFieldA "menu" $ 
      requireAll_ (grpI d) >>> arr mconcat >>> arr pageBody

-- build the app from all the other content route to index.html
createHTML = do
  loadTemplates
  markupMarkdown
  buildMenuItems
  buildContentPages
  buildMenuPages
  match "index.html" $ route idRoute
  create "index.html" $ (requireAll_ (inGroup $ Just "content-pages") 
    &&& requireAll_ (inGroup $ Just "menu-pages"))
    >>> arr (\(cs, ms) -> concat (ms ++ cs))
    >>> applyTemplateCompiler "templates/wrapper.hamlet"
    >>> relativizeUrlsCompiler

copyRoute = do
  route idRoute
  compile copyFileCompiler

main :: IO ()
main = hakyllWith config $ do
  match "config.xml" copyRoute        -- phonegap build config
  match "static/icons/icon.png" $ do  -- icon needs to be at top level
    route $ constRoute "icon.png"
    compile copyFileCompiler
  match "static/**" copyRoute
  match "styles/**" copyRoute         -- route styles
  match "scripts/**" copyRoute        -- route all scripts
  createHTML                          -- create index.html
