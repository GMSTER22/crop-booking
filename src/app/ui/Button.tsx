
type Button = 'button' | 'submit' | 'reset'

export default function Button( {
  
  type,

  cta

} : { 
  
  type: Button, 
  
  cta: string

} ) {

  return (

    <button 
    
      type={type ?? 'button'} 
      
      className="px-8 py-3 text-black bg-burnt-sienna rounded-3xl hover:text-burnt-sienna hover:bg-black transition-colors duration-300"
      
    >

      {cta}

    </button>

  )

}