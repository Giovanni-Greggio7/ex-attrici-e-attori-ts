export type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year: number,
  biography: string,
  image: string,
}

type ActressNationality =
  | 'American'
  | 'British'
  | 'Australian'
  | 'Israeli-American'
  | 'South African'
  | 'French'
  | 'Indian'
  | 'Israeli'
  | 'Spanish'
  | 'South Korean'
  | 'Chinese'

const nazionalità: string[] = ['American', 'British', 'Australian', 'Israeli-American', 'South African', 'French', 'Indian', 'Israeli', 'Spanish', 'South Korean', 'Chinese']

export type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: ActressNationality,
}

function isActress(dati: unknown): dati is Actress {
  if (
    dati &&
    typeof dati === 'object' && dati !== null &&
    'id' in dati && typeof dati.id === 'number' &&
    'name' in dati && typeof dati.name === 'string' &&
    'birth_year' in dati && typeof dati.birth_year === 'number' &&
    'death_year' in dati && typeof dati.death_year === 'number' &&
    'biography' in dati && typeof dati.biography === 'string' &&
    'image' in dati && typeof dati.image === 'string' &&
    'most_famous_movies' in dati &&
    dati.most_famous_movies instanceof Array &&
    dati.most_famous_movies.length === 3 &&
    dati.most_famous_movies.every(m => typeof m === 'string') &&
    'awards' in dati && typeof dati.awards === 'string' &&
    'nationality' in dati && typeof dati.nationality === 'string' &&
    nazionalità.includes(dati.nationality)
  ) {
    return true
  }
  return false
}

async function getActress(id: number): Promise<Actress | null> {
  
  try {

    const response = await fetch(`http://localhost:5001/actresses/${id}`)
    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    if(isActress(data)){
      return data
    }
    throw new Error('Formato dei dati non valido')

  } catch (errore) {

    console.error(errore)
    return null

  }
}
