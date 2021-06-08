import React, { Component } from "react";
import PlantData from "../Helpers/Data/PlantData";
import PlantCard from "../Components/Cards/PlantCard";
import { Plant } from "../Helpers/Interfaces/PlantInterfaces";
import { SearchProps } from "../Helpers/Interfaces/SearchInterfaces";
import { User } from "../Helpers/Interfaces/UserInterface";

type SearchState = {
  results?: Plant[];
  searchTerm: string;
  user: User;
};

export default class Results extends Component<SearchProps, SearchState> {
  state: SearchState = {
    results: [],
    searchTerm: "",
    user: this.props.user.user,
  };

  componentDidMount(): void {
    this.setState({
      searchTerm: this.props.match.params.term,
      
    });
  }
  getProductsFromSearch = (): void => {
    PlantData.search(this.state.searchTerm).then((response) => {
      this.setState({
        results: response,
      });
    });
  };

  componentDidUpdate(prevState: SearchState): void {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.getProductsFromSearch();
    }
  }

  render(): JSX.Element {
    const { results, user } = this.state;
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
    if (results?.length) {
      cards = createCards(results);
    } else {
      cards = [
        <div className="d-flex justify-content-center">
          <h1 className="mt-4 mb-4">No matching plants</h1>
        </div>,
      ];
    }

    return (
      <div>
        <h1 className="mt-4">Results</h1>
        <div className="d-flex flex-wrap justify-content-center">{cards}</div>
      </div>
    );
  }
}
