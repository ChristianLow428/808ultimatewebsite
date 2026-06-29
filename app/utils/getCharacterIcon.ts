// app/utils/getCharacterIcon.ts
export function getCharacterIconUrl(characterOrName: string): string {
  const searchKey = characterOrName.toLowerCase().trim();
  
  // Custom mapping matching real local tags to their fighters
  const tagToCharacter: Record<string, string> = {
    christian: "joker",
    sora: "sora",
    vandis: "ridley",
    // Add other Hawaii power ranked tags here as they appear on start.gg!
  };

  const character = tagToCharacter[searchKey] || searchKey;

  const mapping: Record<string, string> = {
    joker: "joker",
    sora: "sora",
    ridley: "ridley",
    kazuya: "kazuya",
    fox: "fox",
    wolf: "wolf",
    cloud: "cloud",
    rob: "rob",
    mario: "mario",
  };

  const id = mapping[character] || "mario";
  return `https://www.smashbros.com/assets_v2/img/fighter/thumb/${id}.png`;
}