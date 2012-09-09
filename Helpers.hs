module Helpers
( isParent
, inMenu
, loadJaxScript
, validId
, addValidId
) where

import Hakyll
import Control.Arrow ( arr )
import Data.Char ( isAlphaNum )
import System.FilePath

isParent :: Identifier a -> Bool
isParent d = file == par
  where 
    fp = toFilePath d
    file = dropExtension . takeFileName $ fp
    par = takeFileName . takeDirectory $ fp

inMenu :: Identifier a -> Identifier a -> Bool
inMenu dm di = notThis && (isTerm || isFolder)
  where
    menuPath = toFilePath dm
    itemPath = toFilePath di
    notThis = menuPath /= itemPath
    isTerm = takeDirectory menuPath == takeDirectory itemPath
    itemParPar = takeDirectory . takeDirectory $ itemPath
    isFolder = isParent di && (takeDirectory menuPath == itemParPar)

loadJaxScript :: Compiler a String
loadJaxScript = constA "<script type=\"text/javascript\" src=\"/scripts/loadmj.js\"></script>"

validId :: Page a -> String
validId = filter isAlphaNum . getField "title"

addValidId :: Compiler (Page a) (Page a)
addValidId = arr (\p -> setField "validId" (validId p) p)
