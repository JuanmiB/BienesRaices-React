import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Nav from "./components/Nav/Nav"
import Search from "./components/Search/Search"

const ops = ['Comprar', 'Alquilar', 'Obra nueva', 'Compartir']
const App = () => {
  return (
    <div>
      <Header />
      {/* <Nav /> */}
      <Search radioOps={ops} />
      {/* CONTENIDO */}
      <section className="m-20">
        <h2>Seccion de contenido</h2>
        <article className=" container flex flex-col w-[300px]">
          <header>
            <h3>Titulo de card</h3>
          </header>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam ratione sapiente ipsum fugiat accusantium hic doloremque natus explicabo perferendis sunt. Sit, ut cupiditate! Assumenda magnam laborum perspiciatis nemo, ad maiores?</p>
          <footer>
            <span>Tag</span>
          </footer>
        </article>
      </section>
      <Footer />
    </div>
  )
}

export default App