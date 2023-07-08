import "./css/App.css";
import { Row } from "./components/Row";
import { requests } from "./api/request";
import { Banner } from "./components/Banner";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.feachNetflixOriginals}
        isLargeRow
      />
      <Row title="Top Rated" fetchUrl={requests.feactTopRated} />
      <Row title="Animation Movies" fetchUrl={requests.feactAnimationMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.feactComedyMovies} />
      <Row title="Fantasy Movies" fetchUrl={requests.feactMysteryMovies} />
      <Row title="Romance Movies" fetchUrl={requests.feactRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.feactDocumentMovies} />
    </div>
  );
}

export default App;
