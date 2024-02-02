import photo from './images/FotoAnnamaria2.jpg';
import Image from 'next/image';
import './WhoAmI.css';

export const WhoAmI = () => {
  return (
    <section id="o-mne" className="who-am-i dark">
      <div className="content">
        <Image
          src={photo}
          alt="Annamária Bánová - fotografka"
          className="author"
          width={300}
          height={499}
          priority={true}
        ></Image>
        <div className="text">
          <h2>O mne</h2>
          <p>
            Ahojte! Som Anička, vášnivá fotografka špecializujúca sa na
            fotografovanie detí a rodín. S fotografovaním som začala v roku
            2018, keď som absolvovala svoj prvý fotokurz v škole digitálnej
            fotografie. Po narodení mojich detí ma fotenie ešte viac uchvátilo a
            môj záujem oň sa len prehĺbil. Mojou srdcovou záležitosťou je
            fotografovanie detičiek od tých najmenších až po väčších škôlkárov.
            Snažím sa zachytiť krásu, emócie a autentickosť osôb prostredníctvom
            objektívu.
          </p>
          <p>
            Vo svojej práci ako fotografka kladiem veľký dôraz na detaily,
            zladenie a atmosféru scény. Verím, že precízne pripravená kompozícia
            a vybrané rekvizity vytvárajú unikátnu atmosféru a pomáhajú
            podčiarknuť osobitnosť každého zobrazeného momentu.
          </p>
          <p>
            Ak máte záujem o moje služby alebo máte otázky, neváhajte ma
            kontaktovať prostredníctvom telefónu, emailu alebo sociálnych médií.
            V sekcii <a href="#kontakt">kontakt</a> nájdete všetky potrebné
            kontaktné informácie a formulár na rýchlu otázku ohľadne fotenia.
            Rada vám poskytnem ďalšie informácie, poradím a zodpoviem vaše
            otázky.
          </p>
          <p>
            Staňte sa sledovateľom mojej Facebook stránky{' '}
            <a href="https://www.facebook.com/profile.php?id=100085023186786">
              Leonafoto
            </a>
            , kde nájdete ukážky z fotení, aktuality, novinky o foteniach,
            súťažiach a ďalšie zaujímavosti.
          </p>
        </div>
      </div>
    </section>
  );
};
