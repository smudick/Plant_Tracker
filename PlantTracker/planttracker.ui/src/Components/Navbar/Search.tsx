import React, {Component} from "react";

export default class Search extends Component {
    render() {
        return (
            <form>
                <input 
                    placeholder="Search for a plant!"
                    type="text"
                    name="text"
                />
            </form>
        );
    }
}