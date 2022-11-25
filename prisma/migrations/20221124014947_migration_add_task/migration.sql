-- CreateTable
CREATE TABLE "Task" (
    "taskId" TEXT NOT NULL,
    "first_date_of_execution" TIMESTAMP(3) NOT NULL,
    "repeat" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskId")
);
