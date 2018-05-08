import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  exampleJsonObject = {};

  sch = {
    "type": "object",
    "properties": {
      "first_name": {
        "type": "string"
      }
    }
  }
  item = {
    "name": "General",
    "order": 1,
    "schemas": [
      {
        "name": "General",
        "description": "",
        "order": 10,
        "schema": {
          "type": "object",
          "properties": {
            "first_name": {
              "type": "string"
            },
            "last_name": {
              "type": "string"
            },
            "address": {
              "type": "object",
              "properties": {
                "street_1": {
                  "type": "string"
                },
                "street_2": {
                  "type": "string"
                },
                "city": {
                  "type": "string"
                },
                "state": {
                  "type": "string",
                  "enum": [
                    "AL",
                    "AK",
                    "AS",
                    "AZ",
                    "AR",
                    "CA",
                    "CO",
                    "CT",
                    "DE",
                    "DC",
                    "FM",
                    "FL",
                    "GA",
                    "GU",
                    "HI",
                    "ID",
                    "IL",
                    "IN",
                    "IA",
                    "KS",
                    "KY",
                    "LA",
                    "ME",
                    "MH",
                    "MD",
                    "MA",
                    "MI",
                    "MN",
                    "MS",
                    "MO",
                    "MT",
                    "NE",
                    "NV",
                    "NH",
                    "NJ",
                    "NM",
                    "NY",
                    "NC",
                    "ND",
                    "MP",
                    "OH",
                    "OK",
                    "OR",
                    "PW",
                    "PA",
                    "PR",
                    "RI",
                    "SC",
                    "SD",
                    "TN",
                    "TX",
                    "UT",
                    "VT",
                    "VI",
                    "VA",
                    "WA",
                    "WV",
                    "WI",
                    "WY"
                  ]
                },
                "zip_code": {
                  "type": "string"
                }
              }
            },
            "birthday": {
              "type": "string"
            },
            "notes": {
              "type": "string"
            },
            "phone_numbers": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": [
                      "cell",
                      "home",
                      "work"
                    ]
                  },
                  "number": {
                    "type": "string"
                  }
                },
                "required": [
                  "type",
                  "number"
                ]
              }
            }
          },
          "required": [
            "last_name"
          ]
        },
        "layout": [
          {
            "type": "flex",
            "flex-flow": "row wrap",
            "items": [
              "first_name",
              "last_name"
            ]
          },
          {
            "key": "address.street_1",
            "title": "Address",
            "placeholder": "Street"
          },
          {
            "key": "address.street_2",
            "notitle": true
          },
          {
            "type": "div",
            "display": "flex",
            "flex-direction": "row",
            "items": [
              {
                "key": "address.city",
                "flex": "3 3 150px",
                "notitle": true,
                "placeholder": "City"
              },
              {
                "key": "address.state",
                "flex": "1 1 50px",
                "notitle": true,
                "placeholder": "State"
              },
              {
                "key": "address.zip_code",
                "flex": "2 2 100px",
                "notitle": true,
                "placeholder": "Zip Code"
              }
            ]
          },
          {
            "key": "birthday",
            "type": "date"
          },
          {
            "key": "phone_numbers",
            "type": "array",
            "listItems": 3,
            "items": [
              {
                "type": "div",
                "displayFlex": true,
                "flex-direction": "row",
                "items": [
                  {
                    "key": "phone_numbers[].type",
                    "flex": "1 1 50px",
                    "notitle": true,
                    "placeholder": "Type"
                  },
                  {
                    "key": "phone_numbers[].number",
                    "flex": "4 4 200px",
                    "notitle": true,
                    "placeholder": "Phone Number"
                  }
                ]
              }
            ]
          },
          {
            "type": "section",
            "title": "Notes",
            "expandable": true,
            "expanded": false,
            "items": [
              {
                "key": "notes",
                "type": "textarea",
                "notitle": true
              }
            ]
          }
        ]
      }
    ]
  }
}
