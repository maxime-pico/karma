-- CreateEnum
CREATE TYPE "Act" AS ENUM ('CLIMATE_CHANGE', 'ECOSYSTEM_PRESERVATION', 'RESOURCE_PRESERVATION', 'ANIMAL_CONDITION', 'POLITICAL_RESPONSIBILITY', 'MARKET_INFLUENCE', 'POPULATION_RESPECT', 'CONSUMER_RESPECT', 'QUESTIONABLE_INDUSTRIES', 'SUPPLIER_REGULATION', 'SHAREHOLDER_REMUNERATION', 'TAXATION_LEVEL', 'EXECUTIVE_COMPENSATION', 'EMPLOYEE_EQUITY', 'EMPLOYMENT_CONDITIONS', 'EMPLOYEE_DISCRIMINATIONS', 'WORKING_CONDITIONS', 'MANAGING_CONDITIONS');

-- CreateEnum
CREATE TYPE "Cause" AS ENUM ('ENVIRONMENT', 'ETHICS', 'FISCAL', 'SOCIAL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ASLEEP', 'AWAKEN', 'SACRED', 'SAINT');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "logo" TEXT DEFAULT 'questionmark.png',
    "karma" DOUBLE PRECISION,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "CompanyCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT DEFAULT 'Panda',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "picture" TEXT DEFAULT 'pandahead.png',
    "status" "Status" NOT NULL DEFAULT 'AWAKEN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opinion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    "regardingWhat" "Act" NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sources" TEXT[],
    "tags" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActGrade" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "act" "Act" NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "opinionId" TEXT NOT NULL,

    CONSTRAINT "ActGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CauseGrade" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cause" "Cause" NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CauseGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompanyToCompanyCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyCategory_name_key" ON "CompanyCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToCompanyCategory_AB_unique" ON "_CompanyToCompanyCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToCompanyCategory_B_index" ON "_CompanyToCompanyCategory"("B");

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActGrade" ADD CONSTRAINT "ActGrade_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActGrade" ADD CONSTRAINT "ActGrade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActGrade" ADD CONSTRAINT "ActGrade_opinionId_fkey" FOREIGN KEY ("opinionId") REFERENCES "Opinion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseGrade" ADD CONSTRAINT "CauseGrade_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseGrade" ADD CONSTRAINT "CauseGrade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToCompanyCategory" ADD CONSTRAINT "_CompanyToCompanyCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToCompanyCategory" ADD CONSTRAINT "_CompanyToCompanyCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "CompanyCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
