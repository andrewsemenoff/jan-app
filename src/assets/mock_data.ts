import { loremIpsum } from "react-lorem-ipsum";
import photo_Erdos from "./images/Pal_Erdos.jpg";

export async function fakeFetch(data: string, delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return data;
}

export const avatarErdos = {
  url: photo_Erdos,
  alt: "Paul Erdos",
};

const mathTasks = [
  "Task: Calculate the area (A) of a circle with radius (r): \\(A = \\pi r^2\\).\n\nSolutions:\n\n- For radius \\(r = 5\\) units, \\(A = 25\\pi\\) square units.\n\n- Given \\(r = 2.5\\) cm, \\(A = 6.25\\pi\\) cm².\n\nTeacher's Notes:\n\nRemember that the formula is derived from the circle's definition.",
  "Task: Find the roots of a quadratic equation \\(ax^2 + bx + c = 0\\): \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\).\n\nSolutions:\n\n- For coefficients \\(a=1\\), \\(b=5\\), \\(c=6\\): \\(x = -2\\), \\(-3\\).\n\n- Using \\(a=2\\), \\(b=8\\), \\(c=6\\): \\(x = -1\\), \\(-3\\).\n\nTeacher's Notes:\n\nQuadratic formula is crucial; it helps in solving various problems involving quadratic equations.",
  "Task: Differentiate the function \\(f(x) = \\sin(x) + \\cos(x)\\): \\(f'(x) = \\cos(x) - \\sin(x)\\).\n\nSolutions:\n\n- Derivative of \\(f(x)\\) is \\(f'(x) = -\\sin(x) - \\cos(x)\\).\n\n- After differentiation, \\(f'(x) = -\\cos(x) + \\sin(x)\\).\n\nTeacher's Notes:\n\nPay attention to the chain rule when differentiating trigonometric functions.",
  "Task: Evaluate the integral of \\(x^2\\) from \\(a\\) to \\(b\\): \\(\\int_{a}^{b} x^2 dx = \\frac{1}{3}(b^3 - a^3)\\).\n\nSolutions:\n\n- Integrating from 0 to 3, \\(\\int_{0}^{3} x^2 dx = 9\\).\n\n- For limits -1 to 1, \\(\\int_{-1}^{1} x^2 dx = \\frac{2}{3}\\).\n\nTeacher's Notes:\n\nIntegral of \\(x^n\\) follows a general formula; be sure to substitute the limits correctly.",
  "Task: Solve the system of equations: \\(2x + 3y = 7\\) and \\(4x - 2y = 1\\).\n\nSolutions:\n\n- Solution: \\(x = 1\\), \\(y = 2\\).\n\n- Answer: \\(x = 2\\), \\(y = 1\\).\n\nTeacher's Notes:\n\nUse the elimination or substitution method to find solutions for systems of equations.",
  "Task: Find the limit as \\(x\\) approaches 0 for \\(\\frac{\\sin(x)}{x}\\): \\(\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1\\).\n\nSolutions:\n\n- As \\(x\\) gets closer to 0, \\(\\frac{\\sin(x)}{x}\\) approaches 1.\n\n- For \\(x\\) approaching 0, \\(\\frac{\\sin(x)}{x}\\) tends to 1.\n\nTeacher's Notes:\n\nUnderstanding the concept of limits helps in evaluating these types of limits.",
  "Task: Calculate the sum of the first \\(n\\) terms in an arithmetic sequence: \\(S_n = \\frac{n}{2}(2a + (n-1)d)\\).\n\nSolutions:\n\n- Given \\(n = 5\\), \\(a = 2\\), \\(d = 3\\): \\(S_n = 40\\).\n\n- For \\(n = 10\\), \\(a = 1\\), \\(d = 2\\): \\(S_n = 100\\).\n\nTeacher's Notes:\n\nArithmetic sequences have a constant difference between terms; remember the formula for the sum of arithmetic series.",
];

export const communities = [
  "MathMasters",
  "GeekSquad",
  "ProblemSolvers",
  "NumbersNinjas",
  "LogicLegends",
  "AlgebraAces",
  "CalculationCrew",
  "GeometryGenius",
  "EquationExperts",
  "MathWizards",
];

class Problem {
  id: number;
  title: string;
  author: string;
  createdAt: number;
  votes: number;
  currentAward: number;
  communities: string[];
  solutions: number;
  details: string;
  reactions: {
    likes: number;
    dislikes: number;
  };
  constructor(
    id: number,
    title: string,
    author: string,
    createdAt: number,
    votes: number,
    currentAward: number,
    communities: string[],
    solutions: number,
    details: string,
    reactions: {
      likes: number;
      dislikes: number;
    }
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.createdAt = createdAt;
    this.votes = votes;
    this.currentAward = currentAward;
    this.communities = communities;
    this.solutions = solutions;
    this.details = details;
    this.reactions = reactions;
  }
}

export type ProblemInstance = InstanceType<typeof Problem>;

function getRandomCommunities(array: string[]): string[] {
  const randomCount = Math.floor(Math.random() * 4) + 1; // Random count from 1 to 4
  const shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.slice(0, randomCount); // Return a portion of the shuffled array
}

export function getRandomDetailToProblem() {
  return mathTasks[Math.floor(Math.random() * 7)];
}

export function getMockProblems(numberOfProblems: number): Array<Problem> {
  const mockArray: Problem[] = [];
  const baseTimestamp = 1684103716998; // Base timestamp
  const timestampGap = 1000 * 60 * 60 * 24 * 30 * 3; // Gap of 3 months in seconds
  const details = getRandomDetailToProblem();
  for (let i = 0; i < numberOfProblems; i++) {
    const timestamp =
      baseTimestamp + timestampGap - Math.random() * timestampGap;
    const randomCommunities = getRandomCommunities(communities);
    const problem = new Problem(
      i + 1,
      `Problem ${i + 1} ${loremIpsum({
        avgWordsPerSentence: 7,
        avgSentencesPerParagraph: 1,
        p: 1,
        random: true,
        startWithLoremIpsum: false,
      })}...`,
      `Author ${i + 1}`,
      timestamp,
      Math.floor(Math.random() * 1000), // Random votes
      Math.floor(Math.random() * 1000), // Random currentAward
      randomCommunities,
      Math.floor(Math.random() * 20), // Random solutions
      details,
      {
        likes: Math.floor(Math.random() * 500),
        dislikes: Math.floor(Math.random() * 70),
      }
    );
    mockArray.push(problem);
  }
  return mockArray;
}
