import { hey } from './intro/01-types';
import { charmander } from './intro/03-classes';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
<h1>${hey}!!!</h1>
<p>${charmander.name}</p>
`;
