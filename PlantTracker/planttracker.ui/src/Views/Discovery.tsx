import { Component } from "react";
import { Plant } from "../Helpers/Interfaces/PlantInterfaces";
import PlantData from "../Helpers/Data/PlantData";
import { DiscoveryProps } from "../Helpers/Interfaces/DiscoveryInterfaces";
import PlantCard from "../Components/Cards/PlantCard";

class Discovery extends Component<DiscoveryProps> {
  state = {
    plants: [],
    user: this.props.user.user,
    filteredPlants: [],
    questionNumber: 0,
  };
  componentDidMount = (): void => {
    PlantData.getAllPlants().then((response) => {
      this.setState({
        plants: response,
      });
    });
  };
  startQuiz = (): void => {
    this.setState({
      questionNumber: 1,
      filteredPlants: this.state.plants,
    });
  };
  questionOneResponse = (value: number): void => {
    let plantsLeft: Plant[] = [];
    switch (value) {
      case 1:
        plantsLeft = this.state.filteredPlants.filter(
          (plant: Plant) => plant.max_Height <= 2 && plant.max_Width <= 2
        );
        break;
      case 2:
        plantsLeft = this.state.filteredPlants.filter(
          (plant: Plant) => plant.max_Height <= 5 && plant.max_Width <= 3
        );
        break;
      default:
        plantsLeft = this.state.filteredPlants;
        break;
    }
    this.setState({
      questionNumber: 2,
      filteredPlants: plantsLeft,
    });
  };
  questionTwoResponse = (value: number): void => {
    let plantsLeft: Plant[] = [];
    switch (value) {
      case 1:
        plantsLeft = this.state.filteredPlants.filter(
          (plant: Plant) => plant.shade <= 2
        );
        break;
      case 2:
        plantsLeft = this.state.filteredPlants.filter(
          (plant: Plant) => plant.shade >= 2 && plant.shade <= 4
        );
        break;
      case 3:
        plantsLeft = this.state.filteredPlants.filter(
          (plant: Plant) => plant.shade >= 4
        );
        break;
      default:
        plantsLeft = this.state.filteredPlants;
        break;
    }
    this.setState({
      questionNumber: 3,
      filteredPlants: plantsLeft,
    });
  };
  questionThreeResponse = (value: number): void => {
    let plantsLeft: Plant[] = [];
    switch (value) {
      case 1:
        plantsLeft = this.state.filteredPlants.filter(
          (plant: Plant) =>
            plant.toxic_Dogs === false && plant.toxic_Cats === false
        );
        break;
      case 2:
        plantsLeft = this.state.filteredPlants.filter(
          (plant: Plant) => plant.toxic_Cats === false
        );
        break;
      case 3:
        plantsLeft = this.state.filteredPlants.filter(
          (plant: Plant) => plant.toxic_Dogs === false
        );
        break;
      default:
        plantsLeft = this.state.filteredPlants;
        break;
    }
    this.setState({
      questionNumber: 4,
      filteredPlants: plantsLeft,
    });
  };
  questionFourResponse = (value: number): void => {
    let plantsLeft: Plant[] = [];
    switch (value) {
      case 1:
        plantsLeft = this.state.filteredPlants.filter(
          (plant: Plant) => plant.flowering === true
        );
        break;
      default:
        plantsLeft = this.state.filteredPlants;
        break;
    }
    this.setState({
      questionNumber: 5,
      filteredPlants: plantsLeft,
    });
  };

  render(): JSX.Element {
    const { questionNumber, filteredPlants, user } = this.state;
    const plantCard = (plant: Plant): JSX.Element => {
      return (
        <PlantCard key={plant.id} plant={plant} user={user} homePage={false} />
      );
    };
    const createCards = (plants: Plant[]) => {
      const cards: Plant[] = [];
      plants.forEach((plant) => {
        cards.push(plantCard(plant));
      });
      return cards;
    };
    let cards: Plant[] = [];
    if (filteredPlants?.length) {
      cards = createCards(filteredPlants);
    } else {
      cards = [<h1>something has gone wrong here</h1>];
    }
    return (
      <div>
        {user && (
        <div className="quizContainer">
          {questionNumber === 0 && (
            <div className="d-flex flex-column align-items-center">
              <h1 className="mb-5">Welcome to the Plant Discovery Quiz!</h1>
              <h4 className="m-3">
                Want to find the next plant for your home but aren't sure where
                to start?
              </h4>
              <h4 className="m-3">
                Answer a few simple questions, and we'll give you a perfect fit!
              </h4>
              <button
                className="quizStartButton"
                onClick={() => this.startQuiz()}
              >
                Let's go!
              </button>
            </div>
          )}
          {questionNumber === 1 && (
            <div>
              <h1>Question One</h1>
              <h3 className="m-5">
                Which of these best describes the space where this plant will
                live?
              </h3>
              <div className="quiz">
                <button
                  className="question"
                  onClick={() => this.questionOneResponse(1)}
                >
                  I only have a small space to keep this plant, like a shelf or
                  an end table
                </button>
                <button
                  className="question"
                  onClick={() => this.questionOneResponse(2)}
                >
                  I have a decent amount of space for this plant, like a corner
                  of a room
                </button>
                <button
                  className="question"
                  onClick={() => this.questionOneResponse(3)}
                >
                  I have plenty of room and could fit a larger plant
                </button>
              </div>
            </div>
          )}
          {questionNumber === 2 && (
            <div>
              <h1>Question Two</h1>
              <h3 className="m-5">
                How much natural sunlight is in the space where your plant will
                live?
              </h3>
              <div className="quiz">
                <button
                  className="question"
                  onClick={() => this.questionTwoResponse(1)}
                >
                  Tons! I have large windows that let in a lot of sunlight
                </button>
                <button
                  className="question"
                  onClick={() => this.questionTwoResponse(2)}
                >
                  There is some natural light, at some parts of the day, but
                  it's not the brightest
                </button>
                <button
                  className="question"
                  onClick={() => this.questionTwoResponse(3)}
                >
                  The room is pretty dim most of the time, and I'd really like a
                  plant that is going to be cool with that
                </button>
              </div>
            </div>
          )}
          {questionNumber === 3 && (
            <div>
              <h1>Question Three</h1>
              <h3 className="m-5">
                We love pets and plants and want them to coexist peacefully.{" "}
                <br></br>
                Do you have dogs or cats that might try to taste your new house
                plant?
              </h3>
              <div className="quiz">
                <button
                  className="question"
                  onClick={() => this.questionThreeResponse(1)}
                >
                  Oh yes, I have both cats and dogs and they get into
                  eeeeeeeeverything
                </button>
                <button
                  className="question"
                  onClick={() => this.questionThreeResponse(2)}
                >
                  Yes, I have a cat and I do NOT trust it
                </button>
                <button
                  className="question"
                  onClick={() => this.questionThreeResponse(3)}
                >
                  Yes, my dog eats literally anything and everything
                </button>
                <button
                  className="question"
                  onClick={() => this.questionThreeResponse(4)}
                >
                  No, I do not have any dogs or cats. OR No, I do have pets but
                  they are perfect angels who never eat plants.
                </button>
              </div>
            </div>
          )}
          {questionNumber === 4 && (
            <div>
              <h1>Question Four</h1>
              <h3 className="m-5">
                Would you like your plant to have flowers?
              </h3>
              <div className="quiz">
                <button
                  className="question"
                  onClick={() => this.questionFourResponse(1)}
                >
                  Yes please!
                </button>
                <button
                  className="question"
                  onClick={() => this.questionFourResponse(2)}
                >
                  Flowers are fine, but I don't need them
                </button>
              </div>
            </div>
          )}
          {questionNumber === 5 && (
            <div>
              <h1 className="m-3">
                Based on your answers, we believe that these plants would be
                best suited to your home!
              </h1>
              <div className="d-flex flex-wrap justify-content-center">
                {cards}
              </div>
            </div>
          )}
        </div>
        )}
      {!user && (
          <div>
            <h4 className='m-4'>Please sign in or create an account to take the plant discovery quiz</h4>
          </div>
        )}
      </div>
    );
  }
}
export default Discovery;
