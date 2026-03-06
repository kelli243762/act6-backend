import { NextRequest, NextResponse } from "next/server";

const MEALDB_API_URL = process.env.MEALDB_API_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  try {
    let url = "";
    if (category) {
      url = `${MEALDB_API_URL}/filter.php?c=${category}`;
    } else {
      url = `${MEALDB_API_URL}/search.php?s=${search}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener datos");

    const data = await response.json();
    return NextResponse.json(data, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al conectar con TheMealDB" },
      { status: 500 }
    );
  }
}