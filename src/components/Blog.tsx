import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, ChevronRight, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How to Land Your First AI Engineering Role in 2026',
    excerpt: 'The AI job market is evolving rapidly. Here is what you need to know to stand out from the competition.',
    content: `
      <p>The landscape of Artificial Intelligence engineering has shifted dramatically over the past year. As LLMs become more integrated into every industry, the demand for specialized talent has never been higher. But what does it actually take to land a role at a top-tier AI company in 2026?</p>
      
      <h3>1. Master the Fundamentals</h3>
      <p>While prompt engineering was the buzzword of 2024, 2026 is all about deep integration. You need a solid grasp of Python, PyTorch, and the mathematical foundations of neural networks. Understanding how to fine-tune models for specific use cases is now a baseline requirement. For those interested in the technical shift, our article on <a href="#" data-post-id="2">The Rise of Agentic Workflows</a> provides deeper insights into the new developer stack.</p>
      
      <h3>2. Build a Portfolio of Real-World Applications</h3>
      <p>Don't just show that you can call an API. Show that you can build a system. Projects that demonstrate RAG (Retrieval-Augmented Generation) at scale, or autonomous agents that solve complex multi-step tasks, are highly valued by hiring managers. You can find many such roles on our <a href="#" data-nav="home">AI job board</a>.</p>
      
      <h3>3. Understand AI Ethics and Safety</h3>
      <p>As AI systems become more powerful, companies are increasingly looking for engineers who understand the implications of their work. Familiarity with bias mitigation, safety guardrails, and interpretability tools is a significant advantage. Employers are specifically looking for these <a href="#" data-post-id="3">top AI skills</a> in the current market.</p>
      
      <p>At aicruit, we see thousands of job postings every month. The candidates who succeed are those who combine technical depth with a clear understanding of the business value AI provides.</p>
    `,
    author: 'Dr. Sarah Chen',
    date: 'March 10, 2026',
    readTime: '6 min read',
    category: 'Career Advice',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'The Rise of Agentic Workflows: What it Means for Developers',
    excerpt: 'Moving beyond simple chat interfaces to autonomous agents that can execute complex tasks.',
    content: `
      <p>We are entering the era of the "Agentic Web." Developers are no longer just building interfaces for humans to talk to AI; they are building environments where AI agents can work on behalf of humans. This shift is creating a massive demand for <a href="#" data-nav="home">AI Engineers</a> who can build autonomous systems.</p>
      
      <h3>From Chatbots to Agents</h3>
      <p>The first wave of generative AI was primarily about content generation. The second wave is about action. An agentic workflow involves an AI model that can use tools, browse the web, and interact with other software to complete a goal. If you are just starting out, check our guide on <a href="#" data-post-id="1">landing your first AI role</a>.</p>
      
      <h3>The New Developer Stack</h3>
      <p>To build these workflows, developers are reaching for new tools. Frameworks like LangChain and AutoGPT have matured, and new specialized databases for vector search are becoming standard parts of the infrastructure. These are among the <a href="#" data-post-id="3">most in-demand AI skills</a> right now.</p>
      
      <p>If you're looking to future-proof your career, learning how to orchestrate these multi-agent systems is the single best investment you can make today.</p>
    `,
    author: 'Marcus Thorne',
    date: 'March 5, 2026',
    readTime: '8 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Top 5 AI Skills Employers are Looking for Right Now',
    excerpt: 'We analyzed 10,000 job postings on aicruit to find the most in-demand skills in the AI industry.',
    content: `
      <p>What are the skills that will get you hired today? We've crunched the data from the last quarter of job postings on aicruit, and the results are clear. If you want to <a href="#" data-post-id="1">land a role in 2026</a>, these are the areas to focus on.</p>
      
      <h3>1. MLOps and Infrastructure</h3>
      <p>Companies have moved past the experimental phase. They now need to deploy and monitor models at scale. Skills in Kubernetes, Docker, and specialized ML monitoring tools are in high demand.</p>
      
      <h3>2. Vector Databases and RAG</h3>
      <p>Retrieval-Augmented Generation is the standard way to give AI models access to private data. Expertise in Pinecone, Weaviate, or Milvus is mentioned in over 40% of new AI engineering roles. This is particularly relevant for building <a href="#" data-post-id="2">Agentic Workflows</a>.</p>
      
      <h3>3. Multi-Modal Model Integration</h3>
      <p>AI isn't just text anymore. Being able to work with models that process images, audio, and video simultaneously is a rapidly growing requirement. You can browse <a href="#" data-nav="home">multi-modal AI jobs</a> on our platform.</p>
      
      <p>Stay tuned to the aicruit blog for more data-driven insights into the AI job market. If you have any questions or want to see a specific topic covered, feel free to <a href="#" data-nav="contact">contact our team</a>.</p>
    `,
    author: 'Elena Rodriguez',
    date: 'February 28, 2026',
    readTime: '5 min read',
    category: 'Industry Trends',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'The 2026 AI Salary Guide: What to Expect for Entry-Level vs. Senior Roles',
    excerpt: 'Artificial Intelligence has transitioned to the backbone of the global economy. Discover the current compensation landscape for AI talent.',
    content: `
      <p>As we move through 2026, Artificial Intelligence has transitioned from a specialized tech vertical to the backbone of the global economy. For job seekers, this shift has created a dual reality: while the demand for AI talent is at an all-time high, the "skills premium" has become more specific. The era of "general AI knowledge" is over; we have entered the era of specialized implementation and production-grade reliability.</p>
      
      <p>Whether you are a recent graduate looking for your <a href="#" data-post-id="1">first junior role</a> or a seasoned architect eyeing a leadership position, understanding the current compensation landscape is critical for negotiation. This guide provides a comprehensive breakdown of the market, backed by data from over 50,000 job postings and industry reports like the <a href="https://aiindex.stanford.edu/report/" target="_blank" rel="noopener noreferrer">[2026 Stanford AI Index Report]</a>.</p>

      <h3>Key Takeaways: AI Salaries in 2026</h3>
      <ul>
        <li><strong>The GenAI Premium:</strong> Skills in LLM fine-tuning and <a href="#" data-post-id="2">Agentic Workflows</a> add a 25%–35% buffer to base salaries.</li>
        <li><strong>Experience Gaps:</strong> The widest salary jump now occurs between the 3-year and 6-year marks as generalists specialize into MLOps or AI Architecture.</li>
        <li><strong>Global Leveling:</strong> Remote global roles for US/EU companies are paying 2–3x local averages in emerging tech hubs like India and Southeast Asia.</li>
        <li><strong>Compliance is Currency:</strong> Knowledge of the <a href="https://artificialintelligenceact.eu/" target="_blank" rel="noopener noreferrer">[Official EU AI Act Portal]</a> is now a mandatory requirement for high-paying senior roles in the European market.</li>
      </ul>

      <h3>1. Entry-Level AI Roles (0–2 Years Experience)</h3>
      <p>In 2026, "Entry-Level" no longer means "Beginner." The barrier to entry has risen significantly. Companies now expect freshers to arrive with a portfolio of deployed RAG (Retrieval-Augmented Generation) applications or specialized internships where they have worked on production-grade models.</p>
      
      <p><strong>Average Salary Range (Global/US):</strong> $85,000 – $115,000</p>
      <p><strong>Average Salary Range (India):</strong> ₹8 LPA – ₹15 LPA</p>
      
      <p>What’s changing? General "Software Engineer" roles are seeing flat growth, but entry-level roles that specify AI Fluency are commanding significant signing bonuses. Employers are prioritizing "implementation over familiarity." If you can show a live agent that handles complex multi-step reasoning, you are already in the top 10% of entry-level candidates.</p>

      <h3>2. Mid-Level AI Roles (3–6 Years Experience): The "Sweet Spot"</h3>
      <p>This is the most competitive segment of the 2026 market. Professionals with 3+ years of experience in model training, vector databases, and AI pipelines are seeing the highest year-over-year growth. These are among the <a href="#" data-post-id="3">top AI skills</a> employers are looking for right now.</p>
      
      <p><strong>Average Salary Range (Global/US):</strong> $145,000 – $210,000</p>
      <p><strong>Average Salary Range (India):</strong> ₹25 LPA – ₹45 LPA</p>

      <h4>Deep Dive: Why MLOps and Vector Databases are the 2026 "Sweet Spot"</h4>
      <p>The transition from "Experimental AI" to "Production AI" is the defining trend of 2026. In 2024 and 2025, many companies were in the "Proof of Concept" (PoC) phase, building cool demos that rarely saw the light of day in a production environment. Today, the focus has shifted entirely to reliability, scalability, and cost-efficiency. This is where MLOps (Machine Learning Operations) and Vector Database expertise become invaluable.</p>
      
      <p>MLOps engineers are the bridge between a research model and a stable product. They manage the lifecycle of models, ensuring that they don't hallucinate in production, that latency remains low, and that inference costs don't spiral out of control. Similarly, Vector Databases (like Pinecone, Milvus, or Weaviate) have become the "memory" of modern AI. Understanding how to optimize vector search, manage embeddings, and implement complex RAG architectures is what separates a $150k engineer from a $250k architect. Companies are no longer looking for people who can "talk to models"; they want people who can build the infrastructure that makes models useful at scale.</p>

      <h3>3. Senior & Leadership Roles (7+ Years Experience)</h3>
      <p>At the senior level, the market differentiates between Technical Architects and Strategic Leaders. The "Principal AI Engineer" role has become one of the highest-paid individual contributor roles in tech history.</p>
      
      <p><strong>Average Salary Range (Global/US):</strong> $250,000 – $550,000+ (Total Compensation)</p>
      <p><strong>Average Salary Range (India):</strong> ₹60 LPA – ₹1.5 Cr+</p>
      
      <p><strong>Strategic Impact:</strong> For Senior Architects, salary is no longer just about coding. It is about AI Governance, Ethics, and ROI. Companies are paying premiums for leaders who can ensure AI deployments are compliant with the latest global regulations. Leadership roles now require a deep understanding of the <a href="https://www.oecd.org/en/topics/ai.html" target="_blank" rel="noopener noreferrer">[OECD AI Principles]</a> to navigate the complex legal landscape of 2026.</p>

      <h3>4. Global Perspective: Salary Variations by Region</h3>
      <p>The AI talent market is global, but compensation still reflects local economic realities and regulatory environments. Here is how the major regions compare in 2026:</p>
      
      <h4>United States: The Innovation Premium</h4>
      <p>The US remains the highest-paying market, driven by intense competition among Big Tech and well-funded AI startups. San Francisco, New York, and Seattle continue to lead, with base salaries often starting where European totals end. However, the cost of living in these hubs remains a significant factor.</p>
      
      <h4>European Union: The Compliance Premium</h4>
      <p>In the EU, particularly in Germany and the UK (post-alignment), salaries have seen a unique "Compliance Bump." With the full enforcement of the EU AI Act, companies are desperate for "AI Compliance Officers" and "Safe AI Architects." These roles often pay 20-30% more than standard engineering roles in the same region, as they mitigate the massive legal risks associated with non-compliant AI deployments.</p>
      
      <h4>India: The Global Capability Center (GCC) Boom</h4>
      <p>India has transitioned from an "outsourcing hub" to a "capability hub." Global companies are setting up GCCs in Bangalore, Hyderabad, and Pune that handle core AI research and development. While local startups pay competitively, the real high-earners in India are those working for US-based GCCs, often earning salaries that allow for a significantly higher quality of life than their counterparts in the West.</p>

      <h3>5. Factors Influencing Your 2026 Paycheck</h3>
      <p>To maximize your earning potential on our job portal, keep an eye on these three variables:</p>
      
      <h4>A. The Industry Vertical</h4>
      <p>FinTech remains the leader, with AI-driven fraud detection and automated trading systems generating massive ROI. Healthcare is a close second, with predictive diagnostics and personalized medicine attracting billions in investment. Cybersecurity has also emerged as a high-pay vertical, as AI-driven threat hunting becomes the only way to combat AI-driven malware.</p>

      <h4>B. The Tech Stack Currency</h4>
      <p>Proficiency in the following tools is currently linked to higher pay bands:</p>
      <ul>
        <li><strong>Frameworks:</strong> PyTorch, LangChain, CrewAI (for autonomous agents).</li>
        <li><strong>Infrastructure:</strong> AWS SageMaker, GCP Vertex AI, NVIDIA NIM.</li>
        <li><strong>Specialization:</strong> Multimodal AI and Small Language Models (SLMs) for edge computing.</li>
      </ul>

      <h3>Frequently Asked Questions (FAQ)</h3>
      
      <h4>Which programming language pays the most in AI in 2026?</h4>
      <p>While Python remains the undisputed king for model development and data science, <strong>Rust</strong> and <strong>C++</strong> are commanding the highest premiums for AI Infrastructure and high-performance inference roles. If you can optimize a model's performance at the hardware level, you are in the highest pay bracket.</p>
      
      <h4>Is a Master's degree required for $100k+ AI jobs in 2026?</h4>
      <p>No. While a Master's or PhD is still preferred for "Research Scientist" roles, "AI Engineering" and "MLOps" roles prioritize proven production experience. A strong portfolio of deployed, scalable AI applications is often worth more than a degree in the current market.</p>
      
      <h4>How much does "Prompt Engineering" pay in 2026?</h4>
      <p>The standalone "Prompt Engineer" role has largely disappeared. It has been absorbed into the "AI Engineer" role. However, expertise in complex prompt chaining and agentic orchestration still adds a 15-20% premium to standard software engineering salaries.</p>
      
      <h4>What is the impact of the EU AI Act on global AI salaries?</h4>
      <p>It has created a new high-paying niche for "AI Auditors" and "Compliance Engineers." Even US-based companies selling into Europe are hiring for these roles, leading to a global demand for professionals who understand AI safety and legal frameworks.</p>
      
      <h4>Can I earn a US salary while living in India or SE Asia?</h4>
      <p>Yes, but it's rare. Most "Global Remote" roles use a "Local Premium" model—paying significantly above the local market rate but below the San Francisco rate. However, for top 1% talent, "True Global Pay" (US-level wages regardless of location) is becoming more common in specialized niches like LLM architecture.</p>

      <h3>Conclusion: How to Negotiate in 2026</h3>
      <p>The 2026 AI job market rewards <strong>proven outcomes</strong>. When applying for roles, don't just list skills—list impact. "Reduced inference costs by 20%" or "Automated 80% of customer tickets using LLM agents" are the phrases that trigger the highest salary brackets. The market is no longer impressed by what you know; it is impressed by what you have built and deployed.</p>
      
      <p>Are you looking to take the next step in your AI career? Browse our <a href="#" data-nav="home">Global AI Job Board</a> for the latest high-paying opportunities and start your journey toward the future of work today.</p>
    `,
    author: 'David Miller',
    date: 'March 15, 2026',
    readTime: '12 min read',
    category: 'Industry Trends',
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800'
  }
];

interface BlogProps {
  onNavigate: (view: 'home' | 'contact' | 'about') => void;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleContentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (anchor) {
      e.preventDefault();
      const postId = anchor.getAttribute('data-post-id');
      const nav = anchor.getAttribute('data-nav') as 'home' | 'contact' | 'about' | null;
      
      if (postId) {
        const post = BLOG_POSTS.find(p => p.id === postId);
        if (post) {
          setSelectedPost(post);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (nav) {
        onNavigate(nav);
      }
    }
  };

  if (selectedPost) {
    const relatedPosts = BLOG_POSTS.filter(p => p.id !== selectedPost.id);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </button>

        <img 
          src={selectedPost.image} 
          alt={selectedPost.title}
          className="w-full h-[400px] object-cover rounded-3xl mb-8 shadow-xl"
          referrerPolicy="no-referrer"
        />

        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-full uppercase tracking-wider">
            {selectedPost.category}
          </span>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Calendar className="w-4 h-4" />
            {selectedPost.date}
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Clock className="w-4 h-4" />
            {selectedPost.readTime}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-8 leading-tight">
          {selectedPost.title}
        </h1>

        <div className="flex items-center gap-3 mb-12 pb-8 border-b border-zinc-100">
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white font-bold">
            {selectedPost.author[0]}
          </div>
          <div>
            <div className="font-bold text-zinc-900">{selectedPost.author}</div>
            <div className="text-sm text-zinc-500">AI Industry Analyst</div>
          </div>
        </div>

        <div 
          className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6 prose-a:text-zinc-900 prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          onClick={handleContentClick}
        />

        {/* Related Posts Section */}
        <div className="mt-20 pt-12 border-t border-zinc-100">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map(post => (
              <div 
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:opacity-80 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <h3 className="font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                  {post.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 p-8 bg-zinc-900 rounded-3xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to find your next AI role?</h3>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Join thousands of engineers who have found their dream job through aicruit.
          </p>
          <button 
            onClick={() => onNavigate('home')}
            className="px-8 py-4 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-zinc-100 transition-all"
          >
            Browse All Jobs
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-widest mb-6">
          <BookOpen className="w-3 h-3" />
          aicruit blog
        </div>
        <h1 className="text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
          Insights for the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500">
            AI Workforce
          </span>
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
          Expert advice, industry trends, and technical deep-dives to help you navigate the rapidly evolving AI job market.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <motion.article 
            key={post.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-zinc-400 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-zinc-500 text-sm mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-600">
                    {post.author[0]}
                  </div>
                  <span className="text-xs font-medium text-zinc-600">{post.author}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-20 p-12 bg-zinc-50 rounded-[40px] border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Stay ahead of the curve</h2>
          <p className="text-zinc-500">
            Get the latest AI career insights and job market reports delivered straight to your inbox every week.
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 md:w-64 px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
          />
          <button className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
