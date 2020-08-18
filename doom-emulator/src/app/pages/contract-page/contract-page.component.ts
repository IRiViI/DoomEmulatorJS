import { Component, OnInit } from '@angular/core';
import { ContractsService } from "../../contracts/contracts.service";

import { faSave, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.css']
})
export class ContractPageComponent implements OnInit {

  public contract: any;

  public labels = [
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
    "whereas clause"]
  public selectedLabel;

  public faSave = faSave;
  public faChevronCircleRight = faChevronCircleRight;

  public colors = [
    // "#ffb3ba",
    // "#ffdfba",
    // "#ffffba",
    // "#baffc9",
    // "#bae1ff"
  ]

  constructor(
    private contractsService: ContractsService) { }

  ngOnInit(): void {
    function getRandomColor(value) {
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
    for( let i = 0; i < this.labels.length; i++){
      this.colors.push(getRandomColor(i));
    }
    this.contractsService.getRandomContract()
      .subscribe(
        (contract) => {
          this.contract = contract
          console.log(contract)
          // console.log(notPokemonCards);
        });

  }



  public selectLabel(label: string){
    if (this.selectedLabel == label){
      this.selectedLabel = undefined;
    } else {
      this.selectedLabel = label;
    }
  }

  public labelParagraph(idx, label){
    var labels = this.contract.labels[idx];
    if (!label){
      labels.splice(0, labels.length); 
      return
    }
    if (labels.includes(label)){
      labels.splice(labels.indexOf(label),1); 
      return
    }
    labels.push(label);
  }

  public getLabelColor(label){
    var idx = this.labels.indexOf(label);
    var color = this.colors[idx];
    return color
  }

  public patchContract(){
    this.contractsService.patchContract(this.contract)
    .subscribe(
        () => {
          console.log("Updated")
        });
  }

  public patchAndNewContract(){
    this.contractsService.patchContract(this.contract)
    .subscribe(
        () => {
          console.log("Updated")
          this.contractsService.getRandomContract()
            .subscribe(
              (contract) => {
                this.contract = contract
                console.log(contract)
                // console.log(notPokemonCards);
              });
        });
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
