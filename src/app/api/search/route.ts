import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response: Response = await fetch(
      "https://www.dmv.ca.gov/wasapp/ipp2/initPers.do",
      {
        method: "GET",
      },
    );
    const cookies = response.headers.get("set-cookie");
    console.log(cookies);
    //const html = await response.text();
    //console.log(html);
    
    const response2: Response = await fetch(
      "https://www.dmv.ca.gov/wasapp/ipp2/startPers.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookies || "",
        },
        body: JSON.stringify({
          acknowledged: "true",
          _acknowledged: "on",
        }),
      },
    );
    const html = await response2.text();
    console.log(html);
    {
      /*
    const response3: Response = await fetch(
      "https://www.dmv.ca.gov/wasapp/ipp2/processPers.do",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          imageSelected: "none",
          vehicleType: "AUTO",
          licPlateReplaced: "06405k2",
          last3Vin: "802",
          isRegExpire60: "no",
          isVehLeased: "no",
          plateType: "R",
        }),
      },
    );
    const response4: Response = await fetch(
      "https://www.dmv.ca.gov/wasapp/ipp2/processConfigPlate.do",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          kidsPlate: "",
          plateType: "R",
          plateLength: "7",
          plateNameLow: "environmental",
          plateChar0: "D",
          plateChar1: "O",
          plateChar2: "N",
          plateChar3: "P",
          plateChar4: "E",
          plateChar5: "R",
          plateChar6: "R",
        }),
      },
    );
    const html = await response4.text();
    console.log(html);*/
    }

    return NextResponse.json({ message: "Hello, World!" });
  } catch (e) {
    return NextResponse.json({ message: "Hello, no World!" });
  }
}
