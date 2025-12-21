import { Routes } from "@angular/router";
import { Cards } from "./cards";
import { CardsDetail } from "../cards-detail/cards-detail";

export default [
  {
    path: '',
    title: 'YugiDex - Cards Database',
    component: Cards
  },
  {
    path: 'card/:id',
    title: 'YugiDex - Card Detail',
    component: CardsDetail
  }
] as Routes
