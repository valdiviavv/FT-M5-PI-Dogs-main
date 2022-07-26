import './TemperamentFilter.css';
import React, {Component} from "react";

class TemperamentFilter extends Component {
    render() {
        return (
            <div>
                <label htmlFor="temperament-filter">{this.props.filterLabel}</label>
                <select id="temperament-filter"
                        onChange={(e) => {this.props.filterOnChange(e)}}
                        value={this.props.filterInitialValue}
                >
                    <option value={this.props.filterInitialValue}>
                        {this.props.filterInitialLabel}
                    </option>
                    {this.props.filterOptionList.map(item =>
                        <option key={item.id} value={item.name}>{item.name}</option>
                    )}
                </select>
            </div>
        );
    }
}

TemperamentFilter.defaultProps = {
    filterLabel: "Select one option: ",
    filterInitialValue: "all",
    filterInitialLabel: "All",
    filterOptionList: [{id: 0, name: "empty array"}],
    filterOnChange: () => console.log("TemperamentFilter's filterOnChange option was not set."),
}

export default TemperamentFilter;
