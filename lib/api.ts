import championsData from "@/data/champions.json"

export async function fetchAllChampions() {
  try {
    // Return the champions from the local JSON file
    return championsData.map((champion: any) => ({
      id: champion.id,
      name: champion.name,
      title: champion.title,
      image: champion.image.full,
    }))
  } catch (error) {
    console.error("Error fetching champions:", error)
    return []
  }
}

export async function fetchChampionDetails(championId: string) {
  try {
    // Find the champion in the local JSON file
    const champion = championsData.find((c: any) => c.id === championId)

    if (!champion) {
      throw new Error(`Champion with ID ${championId} not found`)
    }

    // Extract and transform the relevant data
    return {
      id: champion.id,
      name: champion.name,
      title: champion.title,
      gender: champion.gender,
      positions: champion.lane ? champion.lane.split(",") : [],
      species: getChampionSpecies(champion),
      resource: champion.resource,
      rangeType: champion.attackType === "range" ? "A distancia" : "Cuerpo a cuerpo",
      regions: [formatRegion(champion.region)],
      releaseYear: champion.releaseDate,
    }
  } catch (error) {
    console.error(`Error fetching details for champion ${championId}:`, error)
    throw error
  }
}

// Helper function to format region names
function formatRegion(region: string) {
  const regionMap: Record<string, string> = {
    demacia: "Demacia",
    noxus: "Noxus",
    ionia: "Jonia",
    freljord: "Freljord",
    "shadow-isles": "Islas de la Sombra",
    bilgewater: "Aguas Estancadas",
    piltover: "Piltover",
    zaun: "Zaun",
    "bandle-city": "Ciudad de Bandle",
    ixtal: "Ixtal",
    shurima: "Shurima",
    void: "Vacío",
    "mount-targon": "Monte Targon",
    runeterra: "Runaterra",
  }

  return regionMap[region] || region.charAt(0).toUpperCase() + region.slice(1)
}

// Helper function to determine champion species
function getChampionSpecies(champion: any) {
  // This is a simplified approach since species isn't directly in the data
  // We could infer it from other attributes or just use a generic value
  const genreTypes = champion.genre.split(",")

  if (genreTypes.includes("Tank")) return "Tanque"
  if (genreTypes.includes("Mage")) return "Mago"
  if (genreTypes.includes("Assassin")) return "Asesino"
  if (genreTypes.includes("Fighter")) return "Luchador"
  if (genreTypes.includes("Marksman")) return "Tirador"
  if (genreTypes.includes("Support")) return "Soporte"

  return "Humano"
}
