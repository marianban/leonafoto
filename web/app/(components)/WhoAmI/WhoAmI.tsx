import photo from './images/FotoAnnamaria2.jpg';
import Image from 'next/image';
import './WhoAmI.css';

export const WhoAmI = () => {
  return (
    <section id="o-mne" className="who-am-i dark">
      <div className="content">
        <Image
          src={photo}
          alt="Annamária Bánová - fotograf"
          className="author"
          width={300}
        ></Image>
        <div className="text">
          <h2>O mne</h2>
          <p>
            Odkedy som sa stala mamou, je detský úsmev a šibalstvo v očkách tých
            najmenších pre mňa ten najkrajší námet na fotenie. S deťmi je
            fotenie vždy dobrodružstvo, samé si povedia čo a ako bude a aké
            fotografie nakoniec vzniknú. Preto je fotenie detí vždy jedinečné a
            nabíja ma energiou.
          </p>
          <p>
            Pri detskom fotení sa snažím deťom prispôsobiť, neštylizujem každý
            záber, ale nechávam aj na deťoch, nech sa prejavia. Som rada, keď sa
            detičky uvoľnia a stanú sa sami sebou, tak aby vzniknuté zábery boli
            najmä o nich. Preto je fajn, aj sú aj rodičia na fotení naladení na
            rovnakú vlnovú dĺžku, komunikujú a zabávajú sa s deťmi. Fotím aj s
            rekvizitami, ale vždy len tak, aby neboli na fotke dôležitejšie ako
            Vaše dieťa. Najradšej mám čisté a jedinečné zábery detičiek v ich
            prirodzenom prostredí.
          </p>
        </div>
      </div>
    </section>
  );
};
