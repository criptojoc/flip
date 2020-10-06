import React from 'react';
import classNames from 'classnames';
import {ReactComponent as IconMinus} from "../../../assets/icons/minus.svg";
import {ReactComponent as IconPlus} from "../../../assets/icons/plus.svg";

const data = [
  {
    title: 'Statul nu mai are de unde fura',
    content: 'Statul să nu se mai ocupe de prestarea serviciilor gratuite către cetățeni, cetățenii au un venit garantat și îl pot folosi pentru a procura alimente, medicină, educație și alte servicii de la companii private sau indivizi.',
  },
  {
    title: 'Inițiativa privată produce bunuri și livrează servicii calitative la prețuri joase',
    content: 'Istoria a demonstrat că inițiativa privată este mult mai eficientă în gestionarea finanțelor și în producere. Companiile private într-un ecosistem de piață liberă (lipsită de monopoluri) vor crea produse ieftine și calitative sub presiunea concurenței. Nu mai este nevoie să primești medicină necalitativă sau educație proastă, zis “gratis”, care oricum ești nevoit să o plătești prin impozite și mita.',
  },
  {
    title: 'Se elimină majoritatea impozitelor',
    content: 'Statul nu mai are nevoie de un număr mare de impozite. Deoarece statul nu mai oferă servicii gratuite, are nevoie de un buget mult mai mic pentru propria întreținere și respectiv numărul și mărimea impozitelor poate fi micșorată semnificativ. Efectiv un singur impozit ar fi îndeajuns, impozitul pe vânzare de 7.5% (după modelul din SUA) care se va achita la "casă". Fără TVA, impozite pe venit, accize etc.',
  },
  {
    title: 'Număr redus de bugetari',
    content: 'Statul minim este un stat puternic. Prin stat minim se are în vedere un aparat de stat (guvern) compact, cu un număr minim de ministere, număr minim de instituții publice (doar cele absolute necesare) și un număr mic de bugetari. Un stat minim, este un stat fară corupție și un stat în care se poate ajunge la o justiție adevărată. Salariile angajaților publici vor fi la nivel European iar oportunitățile de a căștiga bani din sistem, minime și vizibile.',
  },
  {
    title: 'Socialism vs. Capitalism',
    content: 'De-a lungul istoriei lumea a fost pusă în fața alegerii între socialsim și capitalism. Socialismul promitea să micșoreze diferența între bogați și săraci, pe când capitalismul promitea creștere economică, locuri de muncă, inovație și produse ieftine. Acest conflict a dus spre crearea unor guverne mari care au dus spre tot mai multe controale și tot mai multe reglamentări, autorizații etc. care în final au făcut practic imposibilă formarea unei afaceri și crearea unor locuri de muncă,  iar diferență financiara intre saraci și bogați doar s-a lărgit. Au avut de pierdut toți, și socialiștii și capitaliștii, iar câștigul le-a revenit corupților care au infiltrat tot aparatul Statal de la clerci până la judecători, miniștri și politicieni. Când doi se ceartă câștigă al treilea. \n\r\n\rVenitul Universal Garantat, rezolvă acest conflict. Repartizând bani cetățenilor direct și micșorând greutatea impozitelor asupra întreprinderilor, venitul universal garantat promite un trai decent tuturor claselor sociale, deasemeni permite oamenilor să se ocupe de activități îndrăgite precum arta, sportul sau alte interese. În același timp Venitul Universa Garantat permite inovatorilor și antreprenorilor să ia mai multe riscuri și să îndrăznească să încerce afaceri și idei noi, fiind siguri că în caz de eșec nu se vor duce la zero, deoarece Venitul Universal Garantat le vă asigura o plasă de siguranță.',
  }
];

class VubPermissions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: {0:true},
    }
  }

  setActiveTab = index => () => {
    this.setState(state => ({ active: { ...state.active, [index]: !state.active[index] }}));
  };

  render() {
    const { active } = this.state;

    return (
      <div className="vub__permissions">
        <div className="row">
          <h2>Venitul Universal Garantat permite:</h2>

          <div className="vub__permissions-list">
            {data.map(({ title, content }, i) => (
              <div className={classNames("vub__permissions-list-item", { active: active[i] })} key={i} onClick={this.setActiveTab(i)}>
                <div className={classNames("vub__permissions-list-item-status", { active: active[i] })}>
                  {active[i] ? <IconMinus /> : <IconPlus />}
                </div>
                <h2><span>{i + 1}.</span>{title}</h2>
                {active[i] && <div className="vub__permissions-list-content">
                  {content}
                </div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default VubPermissions;
