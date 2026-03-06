import { NextRequest, NextResponse } from "next/server";

const MEALDB_API_URL = process.env.MEALDB_API_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${MEALDB_API_URL}/lookup.php?i=${id}`
    );
    if (!response.ok) throw new Error("Error al obtener detalle");

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