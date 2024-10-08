import People from '../app/components/People'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import store from '../redux/theme'
import { Provider } from 'react-redux'  
const person = {
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
  "street": "Victor Plains",
  "suite": "Suite 879",
  "city": "Wisokyburgh",
  "zipcode": "90566-7771",
  "geo": {
  "lat": "-43.9509",
  "lng": "-34.4618"
  }
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
  "name": "Deckow-Crist",
  "catchPhrase": "Proactive didactic contingency",
  "bs": "synergize scalable supply-chains"
  }
};

 
test('Page', () => {
  render (<Provider store={store}><People people={person}/></Provider> )
  const contentResult = screen.findByText('Howell'); 
  expect(contentResult).to.exist;
})