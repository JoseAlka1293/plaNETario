import RocketCanvas from '../components/RocketCanvas';

function Home() {
  return (
    <div className="home-container">
      <RocketCanvas />

      <div className="home-content">
        <h1 className="home-title">Bienvenido a plaNETario</h1>
        <p className="home-instructions">Pulsa ➡ para continuar</p>
      </div>
    </div>
  );
}

export default Home;
