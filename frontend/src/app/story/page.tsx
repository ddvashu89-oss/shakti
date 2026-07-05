import Link from 'next/link';
import { Leaf, History, Users, HeartHandshake } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-[#f3efe6] flex flex-col font-sans text-[#201410]">
      
      {/* Hero Section */}
      <section className="bg-[#201410] text-[#f3efe6] py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#d5a046]/30 bg-[#d5a046]/10 text-[#d5a046] text-xs font-bold tracking-[0.2em] uppercase mb-8">Humari Kahani</div>
          <h1 className="text-5xl sm:text-7xl font-serif mb-6 leading-tight font-black">125 Saal Ka<br/><span className="text-[#a04a29]">Bharosa</span></h1>
          <p className="text-[#f3efe6]/80 text-xl font-medium max-w-2xl mx-auto font-serif italic">Hisar ki ek chhoti si chakki se shuru hui humari kahani, shuddhata aur vishwas ki buniyaad par khadi hai.</p>
        </div>
      </section>

      {/* Story Sections */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full space-y-32">
        
        {/* The Beginning */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-[#d5a046] translate-x-4 translate-y-4 rounded-[2rem]"></div>
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#251c17]/10 bg-white relative z-10 p-2">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Old Chakki" className="w-full h-full object-cover rounded-[1.5rem] sepia-[0.3]" />
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <div className="w-16 h-16 bg-[#a04a29]/10 text-[#a04a29] rounded-full flex items-center justify-center mb-6">
              <History className="w-8 h-8" />
            </div>
            <h2 className="text-5xl font-serif font-black text-[#201410]">Shuruwat (1900)</h2>
            <p className="text-lg text-[#201410]/70 leading-relaxed font-medium">
              Yeh sab ek aam soch se shuru hua: &quot;Jaisa ann, waisa mann&quot;. Humare pardada ne Hisar, Haryana ke dil mein pehli patthar ki chakki lagayi thi. Woh khud kisanon se sabse sunehra gehu laate the, aur har daane ko hath se saaf karke thande patthar par piste the, taaki uska poshan barkarar rahe.
            </p>
          </div>
        </div>

        {/* The Promise */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-[#a04a29] -translate-x-4 translate-y-4 rounded-[2rem]"></div>
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#251c17]/10 bg-white relative z-10 p-2">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80" alt="Spices and Grains" className="w-full h-full object-cover rounded-[1.5rem] sepia-[0.2]" />
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <div className="w-16 h-16 bg-[#d5a046]/20 text-[#d5a046] rounded-full flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8" />
            </div>
            <h2 className="text-5xl font-serif font-black text-[#201410]">Shuddhata Ka Vada</h2>
            <p className="text-lg text-[#201410]/70 leading-relaxed font-medium">
              Humne kabhi quality se samjhauta nahi kiya. Jab mang badhi, tab bhi humne unn maseenon ka istemaal nahi kiya jo poshan ko jala deti hain. &quot;Shuddhata hi asli Shakti hai&quot; - yehi humara niyam ban gaya. Humara vada hai ki aapka aata pisne ke kuch hi ghanto mein aap tak pahunchega — &quot;Aaj subah pisa, aaj shaam aapki rasoi mein&quot;.
            </p>
          </div>
        </div>

        {/* The Family Today */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-[#251c17]/10 bg-white p-1">
                <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400&auto=format&fit=crop" alt="Family" className="w-full h-full object-cover rounded-xl sepia-[0.3]" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-[#251c17]/10 bg-white p-1 mt-8">
                <img src="https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?auto=format&fit=crop&w=400&q=80" alt="Spices" className="w-full h-full object-cover rounded-xl sepia-[0.2]" />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <div className="w-16 h-16 bg-[#201410]/10 text-[#201410] rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-5xl font-serif font-black text-[#201410]">Ek Parivarik Parampara</h2>
            <p className="text-lg text-[#201410]/70 leading-relaxed font-medium">
              Aaj, chaar peedhiyon baad bhi, hum ek parivarik business hain. Chehre badal gaye hain, par anaj parakhne wale hath aur aapke parivar ki sehat ke prati humari nishtha waisi hi hai. Jab aap Shakti se judte hain, toh aap sirf customer nahi, humare badhte parivar ka hissa ban jate hain.
            </p>
          </div>
        </div>

      </main>
      
      {/* Footer CTA */}
      <section className="bg-white py-20 border-t border-[#251c17]/10">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <HeartHandshake className="w-20 h-20 text-[#a04a29] mx-auto" />
          <h2 className="text-4xl sm:text-5xl font-serif font-black text-[#201410]">Itihas Ka Swaad Chakhein</h2>
          <p className="text-xl text-[#201410]/60 font-medium">Uss taze, shudh swaad ka anubhav karein jisne ek sadi se bhi zyada samay se parivaron ko jode rakha hai.</p>
          <Link href="/categories" className="inline-block bg-[#201410] text-[#f3efe6] font-bold py-5 px-12 rounded-xl hover:bg-[#a04a29] transition-colors shadow-xl text-sm uppercase tracking-[0.2em] mt-4">
            Saaman Kharidein
          </Link>
        </div>
      </section>

    </div>
  );
}
