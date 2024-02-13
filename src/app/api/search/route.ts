import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export async function POST(req: NextRequest) {
  const isLocal = process.env.AWS_EXECUTION_ENV === undefined;
  const browser = isLocal
    ? // if we are running locally, use the puppeteer that is installed in the node_modules folder
      await require("puppeteer").launch()
    : // if we are running in AWS, download and use a compatible version of chromium at runtime
      await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(
          "https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar",
        ),
        headless: chromium.headless,
      });
  console.log("browser is up");

  await browser.close();
  console.log("browser is closed");

  return NextResponse.json({ message: "exito" }, { status: 200 });
}
