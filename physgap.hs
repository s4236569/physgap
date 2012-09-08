{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}

import BasicPrelude hiding ( group, groupBy )
import Control.Arrow ( (>>>), arr, returnA )
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
markupMarkdown = match allMD . group "pages" $ 
  compile $ pageCompilerWith defaultHakyllParserState pandocWriter

-- take content, apply templates and route to www
renderContent = match isContent . group "rendered-content" $ do
    route . setExtension $ ".html"
    ds <- resources
    forM_ ds $ \d -> 
      create d $ (require_ . depI $ d)
        >>> applyTemplateCompiler "templates/content.hamlet"
        >>> relativizeUrlsCompiler 
  where depI = setGroup (Just "pages")

-- create menu items for all html pages
createMenuItems = match allMD . group "menu-items" $ do
    ds <- resources
    forM_ ds $ \d -> 
      create d $ (require_ . depI $ d)
        >>> (routeArrow d &&& nameArrow)
        >>> arr li
        >>> arr fromBody
  where
    depI = setGroup (Just "pages")
    renI d
      | isParent d = setGroup (Just "rendered-menus") d
      | otherwise  = setGroup (Just "rendered-content") d
    li (Just r, n) = "<li><a href=\"/"++r++"\">"++n++"</a></li>"
    li _ = ""
    routeArrow d = constA (renI d) >>> getRouteFor
    nameArrow = arr (getField "title")
    
-- get menu content, build menu, apply template and route 
renderMenus = match isMenu . group "rendered-menus" $ do 
    match "content/classes/*" (route $ constRoute "index.html")
    route . setExtension $ ".html"
    ds <- resources
    forM_ ds $ \d -> 
      create d $ (require_ . depI $ d) &&& returnA
        >>> setMenuArrow d
        >>> applyTemplateCompiler "templates/menu.hamlet"
        >>> relativizeUrlsCompiler
  where 
    depI = setGroup (Just "pages")
    grpI d = inGroup (Just "menu-items") ++ predicate (inMenu d) 
    setMenuArrow d = setFieldA "menu" $ 
      requireAll_ (grpI d) >>> arr mconcat >>> arr pageBody

copyRoute = do
  route idRoute
  compile copyFileCompiler

routeStyles = match "style/**" copyRoute
routeScripts = match "scripts/**" copyRoute
routeStatic = match "static/**.png" copyRoute  -- pngs only
routeConfig = match "config.xml" copyRoute
 
main :: IO ()
main = hakyllWith config $ do
  routeConfig
  routeStyles
  routeScripts
  routeStatic
  loadTemplates
  markupMarkdown
  createMenuItems
  renderContent
  renderMenus
