import React from 'react';
import Slider from "react-slick";

const settings = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  touchMove: false,

  responsive: [
    {
      breakpoint: 767,
      settings: {
        touchMove: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
  ],
};

class News extends React.PureComponent {
  // openInNewTab = (url) => {
  //   const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  //   if (newWindow) { newWindow.opener = null }
  // }

  render() {
    return (
      <div className="news__press">
        <div className="row">
          <h2>Venitul Universal Garantat in <b>Presa</b></h2>

          <div className="news__press-wrapper">
            <Slider {...settings}>
              <a href="https://www.rfi.ro/economie-121666-venit-moment-venit-universal-garantat" target="_blank" rel="noopener noreferrer" className="news__press-item">
                <div className="news__press-item-image" style={{ backgroundImage: 'url("https://www.rfi.ro/sites/default/files/styles/inside_content/public/articol/portofel_5.jpg?itok=c7NUGuGO")' }}/>
                <h3>A venit momentul pentru venitul universal garantat?</h3>
                <p className="news__press-item-date">02 iunie, 2020</p>
              </a>
              <a href="https://www.digi24.ro/stiri/economie/digi-economic/experimentul-banilor-fara-munca-germania-testeaza-solutia-venitului-universal-de-baza-1356196" rel="noopener noreferrer" target="_blank" className="news__press-item">
                <div className="news__press-item-image" style={{ backgroundImage: 'url("https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZTA2dHJhbnNjb2Rlci5yY3Mt/cmRzLnJvJTJGc3RvcmFnZSUyRjIwMjAl/MkYwNSUyRjMxJTJGMTE5MTg3NF8xMTkx/ODc0X0dldHR5SW1hZ2VzLWdlcm1hbmlh/LXN0ZWFnLVJlaWNoc3RhZy1ndXZlcm4u/anBnJnc9NzgwJmg9NDQwJmhhc2g9MzQ3/MDk2NGM2NTQ5MjdlZTA4YjFhOTQzZDRjMmRlOWY=.thumb.jpg")' }}/>
                <h3>Experimentul banilor fără muncă. Germania testează soluția venitului universal de bază</h3>
                <p className="news__press-item-date">21 august, 2020</p>
              </a>
              <a href="https://romania.europalibera.org/a/bogdan-hossu-f%C4%83r%C4%83-un-venit-minim-garantat-pentru-cei-afla%C8%9Bi-%C3%AEn-dificultate-nu-se-va-putea-face-relansarea-economic%C4%83/30535429.html" rel="noopener noreferrer" target="_blank" className="news__press-item">
                <div className="news__press-item-image" style={{ backgroundImage: 'url("https://gdb.rferl.org/001FB7E2-776F-41DF-8975-EC6A6DB56C4F_w1023_r1_s.jpg")' }}/>
                <h3>Fără un venit minim garantat pentru cei aflați în dificultate nu se va putea face relansarea economică</h3>
                <p className="news__press-item-date">6 aprilie, 2020</p>
              </a>
              <a href="https://www.newmoney.ro/pandemia-covid-19-a-transformat-venitul-universal-de-baza-din-utopie-intr-o-solutie-salvatoare/" target="_blank" rel="noopener noreferrer" className="news__press-item">
                <div className="news__press-item-image" style={{ backgroundImage: 'url("https://www.newmoney.ro/wp-content/uploads/2020/06/venit-universal_01_gettyimages-840x600.jpg")' }}/>
                <h3>Pandemia COVID-19 a transformat venitul universal de baza din utopie într-o soluție salvatoare</h3>
                <p className="news__press-item-date">24 iunie, 2020</p>
              </a>
              <a href="https://www.scena9.ro/article/venit-minim-garantat" target="_blank" rel="noopener noreferrer" className="news__press-item">
                <div className="news__press-item-image" style={{ backgroundImage: 'url("https://www.scena9.ro/assets/images/2463/homeless-212591_1920_(1).jpg")' }}/>
                <h3>De ce ar trebui să dăm bani nemunciți tuturor</h3>
                <p className="news__press-item-date">9 aprilie, 2020</p>
              </a>

            </Slider>
          </div>

        </div>
      </div>
    );
  }
}

export default News;
