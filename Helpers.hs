module Helpers
( isParent
, inMenu
) where

import Hakyll
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
