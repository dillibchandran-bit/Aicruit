import { Job } from '../types';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Note: In a real production app, we might use a proxy or a backend to aggregate these.
// For this demo, we'll fetch from public APIs that support CORS or are commonly used.

export async function fetchExternalJobs(): Promise<Job[]> {
  try {
    const jobs: Job[] = [];
    const aiKeywords = [
      'ai', 'machine learning', 'ml', 'data scientist', 'deep learning', 
      'nlp', 'natural language processing', 'computer vision', 'robotics',
      'mlops', 'prompt engineer', 'ai developer', 'ai architect', 
      'ai product manager', 'ai ethics', 'ai safety', 'llm', 'generative ai'
    ];

    // 1. Fetch from Remotive (Public API)
    try {
      const remotiveRes = await fetch('https://remotive.com/api/remote-jobs?category=software-dev&limit=150');
      const remotiveData = await remotiveRes.json();
      
      const remotiveJobs: Job[] = remotiveData.jobs
        .filter((j: any) => {
          const title = j.title.toLowerCase();
          const desc = j.description.toLowerCase();
          return aiKeywords.some(keyword => title.includes(keyword) || desc.includes(keyword));
        })
        .map((j: any) => ({
          id: `remotive-${j.id}`,
          title: j.title,
          company: j.company_name,
          location: j.candidate_required_location || 'Remote',
          url: j.url,
          description: j.description,
          category: j.category,
          type: j.job_type || 'Full-time',
          postedAt: j.publication_date,
          source: 'Remotive',
          logo: j.company_logo
        }));
      jobs.push(...remotiveJobs);
    } catch (e) {
      console.error('Error fetching from Remotive:', e);
    }

    // 2. Fetch from Arbeitnow (Public API)
    try {
      const arbeitRes = await fetch('https://www.arbeitnow.com/api/job-board-api');
      const arbeitData = await arbeitRes.json();
      
      const arbeitJobs: Job[] = arbeitData.data
        .filter((j: any) => {
          const title = j.title.toLowerCase();
          const desc = j.description.toLowerCase();
          return aiKeywords.some(keyword => title.includes(keyword) || desc.includes(keyword));
        })
        .map((j: any) => ({
          id: `arbeit-${j.slug}`,
          title: j.title,
          company: j.company_name,
          location: j.location,
          url: j.url,
          description: j.description,
          category: 'Engineering',
          type: j.job_types?.[0] || 'Full-time',
          postedAt: new Date().toISOString(),
          source: 'Workable',
          logo: `https://logo.clearbit.com/${j.company_name.toLowerCase().replace(/\s+/g, '')}.com`
        }));
      jobs.push(...arbeitJobs);
    } catch (e) {
      console.error('Error fetching from Arbeitnow:', e);
    }

    // 3. Mocking diverse AI roles based on user request
    const mockJobs: Job[] = [
      {
        id: 'gh-openai-1',
        title: 'Research Scientist, Generative Models',
        company: 'OpenAI',
        location: 'San Francisco, CA',
        url: 'https://openai.com/careers',
        description: 'Join the team building the future of AI...',
        category: 'Research',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Greenhouse',
        logo: 'https://logo.clearbit.com/openai.com'
      },
      {
        id: 'lever-anthropic-1',
        title: 'Software Engineer, AI Safety',
        company: 'Anthropic',
        location: 'London, UK',
        url: 'https://anthropic.com/careers',
        description: 'Help us build safe and reliable AI systems...',
        category: 'Safety',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Lever',
        logo: 'https://logo.clearbit.com/anthropic.com'
      },
      {
        id: 'ashby-perplex-1',
        title: 'MLOps Engineer',
        company: 'Perplexity AI',
        location: 'Tokyo, Japan',
        url: 'https://perplexity.ai/careers',
        description: 'Scaling our ML infrastructure to serve millions...',
        category: 'Infrastructure',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Ashby',
        logo: 'https://logo.clearbit.com/perplexity.ai'
      },
      {
        id: 'mock-intuit-1',
        title: 'Principal Data Scientist',
        company: 'Intuit',
        location: 'Mountain View, CA',
        url: 'https://intuit.com/careers',
        description: 'Leading complex AI initiatives for financial data...',
        category: 'Data Science',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Greenhouse',
        logo: 'https://logo.clearbit.com/intuit.com'
      },
      {
        id: 'mock-pecan-1',
        title: 'AI Product Manager',
        company: 'Pecan AI',
        location: 'Tel Aviv, Israel',
        url: 'https://pecan.ai/careers',
        description: 'Bridging technical AI teams and business needs...',
        category: 'Product',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Lever',
        logo: 'https://logo.clearbit.com/pecan.ai'
      },
      {
        id: 'mock-techtarget-1',
        title: 'AI Ethics Specialist',
        company: 'TechTarget',
        location: 'Boston, MA',
        url: 'https://techtarget.com/careers',
        description: 'Ensuring AI systems are fair, transparent, and unbiased...',
        category: 'Ethics',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Workable',
        logo: 'https://logo.clearbit.com/techtarget.com'
      },
      {
        id: 'mock-apollo-1',
        title: 'Computer Vision Engineer',
        company: 'Apollo University',
        location: 'Chittoor, India',
        url: 'https://apollouniversity.edu.in',
        description: 'Developing systems that interpret visual information...',
        category: 'Specialized',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'SmartRecruiters',
        logo: 'https://logo.clearbit.com/apollouniversity.edu.in'
      },
      {
        id: 'mock-mistral-1',
        title: 'LLM Training Engineer',
        company: 'Mistral AI',
        location: 'Paris, France',
        url: 'https://mistral.ai/careers',
        description: 'Training the next generation of open-weight models...',
        category: 'Engineering',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Ashby',
        logo: 'https://logo.clearbit.com/mistral.ai'
      },
      {
        id: 'mock-cohere-1',
        title: 'NLP Research Scientist',
        company: 'Cohere',
        location: 'Toronto, Canada',
        url: 'https://cohere.com/careers',
        description: 'Advancing the state of the art in NLP...',
        category: 'Research',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Lever',
        logo: 'https://logo.clearbit.com/cohere.com'
      },
      // Indian AI Jobs
      {
        id: 'mock-india-1',
        title: 'Senior AI Engineer (LLMs)',
        company: 'Reliance Jio',
        location: 'Mumbai, India',
        url: 'https://jio.com/careers',
        description: 'Building large scale AI models for millions of users...',
        category: 'Engineering',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Workable',
        logo: 'https://logo.clearbit.com/jio.com'
      },
      {
        id: 'mock-india-2',
        title: 'Machine Learning Scientist',
        company: 'Flipkart',
        location: 'Bangalore, India',
        url: 'https://flipkart.com/careers',
        description: 'Optimizing supply chain and recommendations using ML...',
        category: 'Research',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Greenhouse',
        logo: 'https://logo.clearbit.com/flipkart.com'
      },
      {
        id: 'mock-india-3',
        title: 'Computer Vision Engineer',
        company: 'Ola Electric',
        location: 'Bangalore, India',
        url: 'https://olaelectric.com/careers',
        description: 'Developing autonomous driving features for EVs...',
        category: 'Engineering',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Lever',
        logo: 'https://logo.clearbit.com/olaelectric.com'
      },
      {
        id: 'mock-india-4',
        title: 'AI Solutions Architect',
        company: 'Tata Consultancy Services',
        location: 'Hyderabad, India',
        url: 'https://tcs.com/careers',
        description: 'Designing enterprise AI solutions for global clients...',
        category: 'Infrastructure',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'SmartRecruiters',
        logo: 'https://logo.clearbit.com/tcs.com'
      },
      {
        id: 'mock-india-5',
        title: 'Deep Learning Researcher',
        company: 'Wipro AI',
        location: 'Pune, India',
        url: 'https://wipro.com/careers',
        description: 'Researching next-gen neural architectures...',
        category: 'Research',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Greenhouse',
        logo: 'https://logo.clearbit.com/wipro.com'
      },
      {
        id: 'mock-india-6',
        title: 'NLP Engineer',
        company: 'Haptik',
        location: 'Mumbai, India',
        url: 'https://haptik.ai/careers',
        description: 'Building conversational AI for the world...',
        category: 'Engineering',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Lever',
        logo: 'https://logo.clearbit.com/haptik.ai'
      },
      {
        id: 'mock-india-7',
        title: 'Data Scientist, AI Safety',
        company: 'Infosys',
        location: 'Chennai, India',
        url: 'https://infosys.com/careers',
        description: 'Ensuring responsible AI deployment at scale...',
        category: 'Safety',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Workable',
        logo: 'https://logo.clearbit.com/infosys.com'
      },
      {
        id: 'mock-india-8',
        title: 'MLOps Architect',
        company: 'Zomato',
        location: 'Gurgaon, India',
        url: 'https://zomato.com/careers',
        description: 'Managing the lifecycle of ML models in production...',
        category: 'Infrastructure',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Ashby',
        logo: 'https://logo.clearbit.com/zomato.com'
      },
      // UAE AI Jobs
      {
        id: 'mock-uae-1',
        title: 'AI Research Scientist',
        company: 'TII (Technology Innovation Institute)',
        location: 'Abu Dhabi, UAE',
        url: 'https://tii.ae/careers',
        description: 'Working on Falcon LLM and next-gen generative models...',
        category: 'Research',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Lever',
        logo: 'https://logo.clearbit.com/tii.ae'
      },
      {
        id: 'mock-uae-2',
        title: 'Computer Vision Specialist',
        company: 'G42',
        location: 'Dubai, UAE',
        url: 'https://g42.ai/careers',
        description: 'Applying AI to smart city and healthcare initiatives...',
        category: 'Engineering',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Greenhouse',
        logo: 'https://logo.clearbit.com/g42.ai'
      },
      // China AI Jobs
      {
        id: 'mock-china-1',
        title: 'Senior Deep Learning Researcher',
        company: 'Baidu',
        location: 'Beijing, China',
        url: 'https://talent.baidu.com',
        description: 'Advancing Ernie Bot and large-scale multimodal models...',
        category: 'Research',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Workable',
        logo: 'https://logo.clearbit.com/baidu.com'
      },
      {
        id: 'mock-china-2',
        title: 'Autonomous Driving Engineer',
        company: 'Pony.ai',
        location: 'Shenzhen, China',
        url: 'https://pony.ai/careers',
        description: 'Building the brain for Level 4 autonomous vehicles...',
        category: 'Engineering',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Ashby',
        logo: 'https://logo.clearbit.com/pony.ai'
      },
      // Canada AI Jobs
      {
        id: 'mock-canada-1',
        title: 'ML Engineer, Personalization',
        company: 'Shopify',
        location: 'Montreal, Canada',
        url: 'https://shopify.com/careers',
        description: 'Building AI-driven commerce experiences for millions of merchants...',
        category: 'Engineering',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Greenhouse',
        logo: 'https://logo.clearbit.com/shopify.com'
      },
      // Israel AI Jobs
      {
        id: 'mock-israel-1',
        title: 'Algorithm Developer',
        company: 'Mobileye',
        location: 'Jerusalem, Israel',
        url: 'https://mobileye.com/careers',
        description: 'Developing vision-based driver assistance systems...',
        category: 'Engineering',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Lever',
        logo: 'https://logo.clearbit.com/mobileye.com'
      },
      // France AI Jobs
      {
        id: 'mock-france-1',
        title: 'AI Software Engineer',
        company: 'Hugging Face',
        location: 'Paris, France',
        url: 'https://huggingface.co/careers',
        description: 'Building the open-source home for machine learning...',
        category: 'Engineering',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        source: 'Ashby',
        logo: 'https://logo.clearbit.com/huggingface.co'
      }
    ];
    
    jobs.push(...mockJobs);

    // Sort by date
    return jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
}
