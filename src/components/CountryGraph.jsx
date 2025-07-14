import { useState,useEffect } from 'react'
import './CountryGraph.css'
import {data} from '../data'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CountryGraph({french}) {
    const [selectedCountry, setSelectedCountry] = useState("Afghanistan");
    const [frenchSelectedCountry, setFrenchSelectedCountry] = useState("Afghanistan");
    const [filteredData, setFilteredData] = useState([]);
    const [frenchFilteredData,setFrenchFilteredData] = useState([])

    const uniqueCountries = [...new Set(data.map(item => item.Entity))];

   const frenchCountries = [
    "Afghanistan",
    "Afrique",
    "Albanie",
    "Algérie",
    "Samoa américaines",
    "Amériques",
    "Andorre",
    "Angola",
    "Anguilla",
    "Antigua-et-Barbuda",
    "Argentine",
    "Arménie",
    "Aruba",
    "Asie",
    "Australie",
    "Autriche",
    "Azerbaïdjan",
    "Bahamas",
    "Bahreïn",
    "Bangladesh",
    "Barbade",
    "Biélorussie",
    "Belgique",
    "Belize",
    "Bénin",
    "Bermudes",
    "Bhoutan",
    "Bolivie",
    "Bonaire, Saint-Eustache et Saba",
    "Bosnie-Herzégovine",
    "Botswana",
    "Brésil",
    "Îles Vierges britanniques",
    "Brunéi",
    "Bulgarie",
    "Burkina Faso",
    "Burundi",
    "Cambodge",
    "Cameroun",
    "Canada",
    "Cap-Vert",
    "Îles Caïmans",
    "République centrafricaine",
    "Tchad",
    "Chili",
    "Chine",
    "Colombie",
    "Comores",
    "Congo",
    "Îles Cook",
    "Costa Rica",
    "Côte d’Ivoire",
    "Croatie",
    "Cuba",
    "Curaçao",
    "Chypre",
    "Tchéquie",
    "République démocratique du Congo",
    "Danemark",
    "Djibouti",
    "Dominique",
    "République dominicaine",
    "Timor oriental",
    "Équateur",
    "Égypte",
    "Salvador",
    "Angleterre et Pays de Galles",
    "Guinée équatoriale",
    "Érythrée",
    "Estonie",
    "Eswatini",
    "Éthiopie",
    "Europe",
    "Îles Falkland (Malouines)",
    "Îles Féroé",
    "Fidji",
    "Finlande",
    "France",
    "Guyane française",
    "Polynésie française",
    "Gabon",
    "Gambie",
    "Géorgie",
    "Allemagne",
    "Ghana",
    "Gibraltar",
    "Grèce",
    "Groenland",
    "Grenade",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernesey",
    "Guinée",
    "Guinée-Bissau",
    "Guyana",
    "Haïti",
    "Pays à revenu intermédiaire de la tranche supérieure",
    "Pays à revenu élevé",
    "Honduras",
    "Hong Kong",
    "Hongrie",
    "Islande",
    "Inde",
    "Indonésie",
    "Iran",
    "Irak",
    "Irlande",
    "Île de Man",
    "Israël",
    "Italie",
    "Jamaïque",
    "Japon",
    "Jersey",
    "Jordanie",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Koweït",
    "Kirghizistan",
    "Pays en développement sans littoral (LLDC)",
    "Laos",
    "Amérique latine et Caraïbes",
    "Lettonie",
    "Pays les moins avancés",
    "Liban",
    "Lesotho",
    "Régions moins développées",
    "Régions moins développées, à l’exclusion de la Chine",
    "Régions moins développées, à l’exclusion des pays les moins avancés",
    "Libéria",
    "Libye",
    "Liechtenstein",
    "Lituanie",
    "Pays à revenu faible et intermédiaire inférieur",
    "Pays à revenu faible et intermédiaire",
    "Pays à faible revenu",
    "Pays à revenu intermédiaire inférieur",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaisie",
    "Maldives",
    "Mali",
    "Malte",
    "Îles Marshall",
    "Martinique",
    "Mauritanie",
    "Maurice",
    "Mayotte",
    "Mexique",
    "États fédérés de Micronésie",
    "Pays à revenu intermédiaire",
    "Moldavie",
    "Monaco",
    "Mongolie",
    "Monténégro",
    "Montserrat",
    "Régions plus développées",
    "Maroc",
    "Mozambique",
    "Myanmar",
    "Namibie",
    "Nauru",
    "Népal",
    "Pays-Bas",
    "Nouvelle-Calédonie",
    "Nouvelle-Zélande",
    "Nicaragua",
    "Niger",
    "Nigéria",
    "Niue",
    "Aucune catégorie de revenu disponible",
    "Corée du Nord",
    "Macédoine du Nord",
    "Amérique du Nord",
    "Irlande du Nord",
    "Îles Mariannes du Nord",
    "Norvège",
    "Océanie",
    "Oman",
    "Pakistan",
    "Palaos",
    "Palestine",
    "Panama",
    "Papouasie-Nouvelle-Guinée",
    "Paraguay",
    "Pérou",
    "Philippines",
    "Pologne",
    "Portugal",
    "Porto Rico",
    "Qatar",
    "La Réunion",
    "Roumanie",
    "Russie",
    "Rwanda",
    "Saint-Barthélemy",
    "Sainte-Hélène",
    "Saint-Kitts-et-Nevis",
    "Sainte-Lucie",
    "Saint-Martin (partie française)",
    "Saint-Pierre-et-Miquelon",
    "Saint-Vincent-et-les-Grenadines",
    "Samoa",
    "Saint-Marin",
    "Sao Tomé-et-Principe",
    "Arabie saoudite",
    "Écosse",
    "Sénégal",
    "Serbie",
    "Seychelles",
    "Sierra Leone",
    "Singapour",
    "Sint Maarten (partie néerlandaise)",
    "Slovaquie",
    "Slovénie",
    "Petits États insulaires en développement (PEID)",
    "Îles Salomon",
    "Somalie",
    "Afrique du Sud",
    "Corée du Sud",
    "Soudan du Sud",
    "Espagne",
    "Sri Lanka",
    "Soudan",
    "Suriname",
    "Suède",
    "Suisse",
    "Syrie",
    "Taïwan",
    "Tadjikistan",
    "Tanzanie",
    "Thaïlande",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinité-et-Tobago",
    "Tunisie",
    "Turquie",
    "Turkménistan",
    "Îles Turks-et-Caïcos",
    "Tuvalu",
    "URSS",
    "Ouganda",
    "Ukraine",
    "Émirats arabes unis",
    "Royaume-Uni",
    "États-Unis",
    "Îles Vierges des États-Unis",
    "Pays à revenu intermédiaire de la tranche supérieure",
    "Uruguay",
    "Ouzbékistan",
    "Vanuatu",
    "Vatican",
    "Venezuela",
    "Vietnam",
    "Wallis-et-Futuna",
    "Sahara occidental",
    "Monde",
    "Yémen",
    "Zambie",
    "Zimbabwe"
]



    const handleCountryChange = (event) => {
        const [index, country] = event.target.value.split('|')
        setSelectedCountry(country)
        setFrenchSelectedCountry(frenchCountries[index])
    };

    useEffect(() => {
         setFilteredData(data.filter(item => item.Entity == selectedCountry ))
         setFrenchFilteredData((data.filter(item => item.Entity == selectedCountry )).map(({ Expectancy, ...rest }) => ({
        Esperance: Expectancy,
        ...rest,
    })))
    },[selectedCountry])

    return (
        <>
        <div className='countryGraph-cont'>
            <div className="country-option-cont">
                <div className="select-country-cont">
                    {!french && <label htmlFor="country" className="select-country-text">Select a region:</label>}
                    {french && <label htmlFor="country" className="select-country-text">Choisissez une région:</label>}
                    <select id="country"  name="country" onChange={handleCountryChange}>
                        {uniqueCountries.map((country,index) => (
                        <option key={index} value={`${index}|${country}`}>
                            {!french?country:frenchCountries[index]}
                        </option>))}
                    </select>
                </div>
                <div className="line-graph-description">
                    {!french? <p className="line-descr">This chart displays how the life expectancy varied over the years for the following region:</p> : <p className="line-descr">Ce graphique montre comment l’espérance de vie a évolué au fil des années pour la région suivante:</p>}
                    <p className="country-name">{!french?selectedCountry:frenchSelectedCountry}</p>
                </div>
            </div>
            <div className="line-graph-cont">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={french?frenchFilteredData:filteredData}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={french? 'Esperance':'Expectancy'} stroke="#72A08B" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
        </>
    )
}

export default CountryGraph
