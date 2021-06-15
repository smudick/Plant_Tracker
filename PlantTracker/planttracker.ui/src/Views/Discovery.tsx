import { Component } from "react";
import Plant from "../Helpers/Interfaces/PlantInterfaces";
import PlantData from "../Helpers/Data/PlantData";
import { DiscoveryProps } from "../Helpers/Interfaces/DiscoveryInterfaces";

class Discovery extends Component<DiscoveryProps> {
  state = {
    plants: [],
    user: this.props.user,
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
      filteredPlants: this.state.plants
    });
  };
  questionOneResponse = (): void => {
      this.setState({
          questionNumber: 2
      })
  }
  questionTwoResponse = (): void => {
      this.setState({
          questionNumber: 3
      })
  }
  questionThreeResponse = (): void => {
      this.setState({
          questionNumber: 4
      })
  }
  questionFourResponse = (): void => {
      this.setState({
          questionNumber: 5
      })
  }
  render(): JSX.Element {
    const { questionNumber } = this.state;
    return (
      <div>
        {questionNumber === 0 && (
          <div>
            <h1>Welcome to the Plant Discovery Quiz!</h1>
            <h4>
              Answering a few simple quesitons will help you find the perfect
              next plant for your home
            </h4>
            <button onClick={() => this.startQuiz()}>Let's go!</button>
          </div>
        )}
        {questionNumber === 1 && 
            <div>
                <h1>Question 1:</h1>
                <h3>Think of where you are planning to have this plant in your house, then select which answer best matches your space</h3>
                <button onClick={() => this.questionOneResponse()}>I only have a small space to keep this plant, like a shelf or an end table</button>
                <button onClick={() => this.questionOneResponse()}>I have a decent amount of space for this plant, like a corner of a room</button>
                <button onClick={() => this.questionOneResponse()}>I have plenty of room and could fit a larger plant</button>
            </div>
        }
        {questionNumber === 2 && 
            <div>
                <h1>Question 2:</h1>
                <h3>How much natural sunlight is in the space where your plant will live?</h3>
                <button onClick={() => this.questionTwoResponse()}>Tons! I have large windows that let in a lot of sunlight</button>
                <button onClick={() => this.questionTwoResponse()}>There is some natural light, at some parts of the day, but it's not the brightest</button>
                <button onClick={() => this.questionTwoResponse()}>The room is pretty dim most of the time, and I'd really like a plant that is going to be cool with that</button>
            </div>
        }
        {questionNumber === 3 && 
            <div>
                <h1>Question 3:</h1>
                <h3>We love pets and plants and want them to coexist peacefully. Do you have dogs or cats that might try to taste your new house plant?</h3>
                <button onClick={() => this.questionThreeResponse()}>Oh yes, I have both cats and dogs and they get into eeeeeeeeverything</button>
                <button onClick={() => this.questionThreeResponse()}>Yes, I have a cat and I do NOT trust it</button>
                <button onClick={() => this.questionThreeResponse()}>Yes, my dog eats literally anything and everything</button>
                <button onClick={() => this.questionThreeResponse()}>No, I do not have any dogs or cats. OR No, I do have pets but they are perfect angels who never eat plants.</button>
            </div>
        }
        {questionNumber === 4 && 
            <div>
                <h1>Question 4:</h1>
                <h3>Would you like your plant to have flowers?</h3>
                <button onClick={() => this.questionFourResponse()}>Yes please!</button>
                <button onClick={() => this.questionFourResponse()}>Flowers are fine, but I don't need them</button>
            </div>
        }
      </div>
    );
  }
}
export default Discovery;
