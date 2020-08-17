import React from "react";
import BarChartIcon from "@material-ui/icons/BarChart";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";

export default function Help() {
  return (
    <div className="help quicksand">
      <p>
        There are 10 questions throughout the quiz.
        <br />
        Each question carries 10 points, so a total of 100 points can be scored.
      </p>
      <p>
        For help there are four lifelines unlocked at certain levels of the
        quiz, with an increase in the allotted time of +10 seconds at those
        levels.
        <br />
        But, every lifeline can be used only once with a deduction of 5 points.
      </p>
      <p>
        Following are the available lifelines which get unlocked respectively.
      </p>
      <hr />
      <p style={{ textAlign: "center", fontWeight: "700" }}>Lifelines:</p>
      <table>
        <tbody>
          <tr>
            <td style={{ width: "30%", paddingLeft: "8%" }}>
              <Lifeline option={<BarChartIcon className="iconSpacer2" />} />
            </td>
            <td>
              This is 'Option Charts'.
              <br />
              On using it charts appear with different percentages for the given
              options. Using this one can get the right answer.
            </td>
          </tr>
          <tr>
            <td style={{ width: "30%", paddingLeft: "8%" }}>
              <Lifeline option="50 : 50" />
            </td>
            <td>
              This is '50 : 50'.
              <br />
              On using it, out of the four given options, two wrong options get
              vanished.
            </td>
          </tr>
          <tr>
            <td style={{ width: "30%", paddingLeft: "8%" }}>
              <Lifeline option={<SearchIcon className="iconSpacer2" />} />
            </td>
            <td>
              This is 'Search the Web'.
              <br />
              On using it one can search the question on the internet.
            </td>
          </tr>
          <tr>
            <td style={{ width: "30%", paddingLeft: "8%" }}>
              <Lifeline option={<AutorenewIcon className="iconSpacer2" />} />
            </td>
            <td>
              This is 'Flip the Question'.
              <br />
              On using it the question changes and a new question appears.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Lifeline(props) {
  return <button className="lifelineBtn">{props.option}</button>;
}
