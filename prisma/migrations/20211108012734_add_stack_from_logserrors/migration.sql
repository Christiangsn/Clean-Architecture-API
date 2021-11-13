/*
  Warnings:

  - Added the required column `stack` to the `log_erros` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_log_erros" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stack" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_log_erros" ("created_at", "id") SELECT "created_at", "id" FROM "log_erros";
DROP TABLE "log_erros";
ALTER TABLE "new_log_erros" RENAME TO "log_erros";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
