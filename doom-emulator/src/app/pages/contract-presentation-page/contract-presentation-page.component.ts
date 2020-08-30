import { Component, OnInit } from '@angular/core';
import { ContractsService } from "../../contracts/contracts.service";

declare const google: any;

@Component({
  selector: 'app-contract-presentation-page',
  templateUrl: './contract-presentation-page.component.html',
  styleUrls: ['./contract-presentation-page.component.css']
})
export class ContractPresentationPageComponent implements OnInit {

  public contract: any;
  public colors = [];
  public label_results = {};
  public missing_labels = [];

  public labels = [
    "ignore",
    "Identification of the parties",
    "recital clause",
    "definition Clause",
    "Grant clause",
    "IP rights CLause",
    "consideration clause", 
    "obligations of the parties",
    "Term and termination Clause",
    "force majeure",
    "severabilty",
    "Non-exclusivity", 
    "non-transferability",
    "Breach of contract",
    "terms of termination",
    "governing law",
    "price/payment terms",
    "confidentiality",
    "price information",
    "Names and dates",
    "Terms of condition clause",
    "Rights clause",
    "whereas clause"];

  constructor(
    private contractsService: ContractsService) { }



  ngOnInit(): void {

    this.setColors();

    this.contractsService.getRandomContract()
      .subscribe(
        (contract) => {
          this.contract = contract
          console.log(contract)
          this.createGraph();
          // console.log(notPokemonCards);
        });
  }

  public createGraph(){


    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {

      this.label_results = {}

      for (let i = 0; i < this.contract.paragraphs.length; i++){
        let label = this.get_predicted_labels(this.contract.predicted_labels[i])[0][0];
        if (!(label in this.label_results)){
          this.label_results[label]=0
        }
        this.label_results[label]++
      }

      var result = Object.keys(this.label_results).map((key)=>{ 
        return [key, this.label_results[key]]; 
      }); 
      console.log([["Label", "count"]].concat(result))

      var data = google.visualization.arrayToDataTable(
        [["Label", "count"]].concat(result)
        );

      var options = {
        title: 'Content of contract'
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      chart.draw(data, options);

      this.missing_labels = [];
      for (let label of this.labels){
        if (!(label in this.label_results)){
          this.missing_labels.push(label);
        }
      }
      console.log(this.missing_labels)
    });
  }

  public setColors(){

    function getColor(value) {
      let remainder = value % 16;
      var hexValue = remainder.toString(16);
      // console.log(value)
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 2; i++) {
        // if (value < 15){
          color += hexValue;
        // } else {
        //   color += "FF";
        // }
      }
      for (var i = 0; i < 2; i++) {
        if (value >= 15){
          color += letters[9];
        } else {
          color += hexValue;
        }
      }
      for (var i = 0; i < 2; i++) {
        if (value >= 15){
          color += hexValue;
        } else {
          color += letters[9];
        }
      }
      color += "44"
      // console.log(color);
      return color;
    }

    this.colors.splice(0, this.colors.length); 
    this.colors.push("#f11");
    for( let i = 1; i < this.labels.length; i++){
      this.colors.push(getColor(i));
    }
  }

  public getLabelColor(label){
    var idx = this.labels.indexOf(label);
    var color = this.colors[idx];
    // console.log(color);
    return color
  }

  private predicted_labels = [
    "Breach of contract",
    "Grant clause",
    "IP rights CLause",
    "Identification of the parties",
    "Non-exclusivity",
    "Term and termination Clause",
    "confidentiality",
    "definition Clause",
    "force majeure",
    "governing law",
    "non-transferability",
    "obligations of the parties",
    "price information",
    "price/payment terms",
    "recital clause",
    "severabilty",
    "terms of termination",
    "whereas clause"
  ]
  public get_predicted_labels(probabilities){
    let output = []
    for (let i = 0; i < probabilities.length; i++){
      let probability = probabilities[i];
      if (probability > 0.1){
        output.push([
          this.predicted_labels[i],
          Math.round(100*probability)
        ])
      }
    }
    return output
  }

}
