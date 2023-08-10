import photo_Erdos from "./images/Pal_Erdos.jpg"

export const avatarErdos = {
  url: photo_Erdos,
  alt: "Paul Erdos",
};


class Problem {
  id: number;
  title: string;
  author: string;
  createdAt: number;
  rating: number;
  currentAward: number;
  constructor(
    id: number,
    title: string,
    author: string,
    createdAt: number,
    rating: number,
    currentAward: number
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.createdAt = createdAt;
    this.rating = rating;
    this.currentAward = currentAward;
  }
}

export type ProblemInstance = InstanceType<typeof Problem>;

export function getMockProblems(numberOfProblems: number): Array<Problem> {
  const mockArray: Problem[] = [];
  const baseTimestamp = 1691437500; // Base timestamp
  const timestampGap = 60 * 60 * 24 * 30 * 3; // Gap of 3 months in seconds

  for (let i = 0; i < numberOfProblems; i++) {
    const timestamp = baseTimestamp + timestampGap-1;
    const problem = new Problem(
      i + 1,
      `Problem ${i + 1}...`,
      `Author ${i + 1}`,
      timestamp,
      Math.floor(Math.random() * 1000), // Random rating
      Math.floor(Math.random() * 1000) // Random currentAward
    );
    mockArray.push(problem);
  }
  return mockArray;
}



