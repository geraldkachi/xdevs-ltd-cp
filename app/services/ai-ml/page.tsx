import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'
export const metadata: Metadata = {
  title: 'AI & ML Integration', description: 'Production-grade AI and ML solutions from XDEVS.',
  alternates: { canonical: 'https://xdevs.io/services/ai-ml' },
}
export default function Page() {
  return <ServicePageLayout index="04" tag="ARTIFICIAL INTELLIGENCE" title="AI & ML INTEGRATION"
    tagline="Intelligent systems built for production."
    description="We design, train, and deploy machine learning models and LLM-powered features that solve real business problems — not demos that never ship to users."
    capabilities={[
      { title: 'LLM-Powered Features', body: 'Integrate GPT-4, Claude, Gemini, or open-source models into your product with robust prompt engineering and guardrails.' },
      { title: 'Custom ML Models', body: 'Train classification, regression, and ranking models on your proprietary data for competitive advantage.' },
      { title: 'Computer Vision', body: 'Image and video analysis for object detection, OCR, quality inspection, and more.' },
      { title: 'Natural Language Processing', body: 'Sentiment analysis, entity extraction, document classification, and semantic search.' },
      { title: 'MLOps & Model Serving', body: 'CI/CD for ML, model monitoring, A/B testing, and low-latency inference infrastructure.' },
      { title: 'AI Strategy Consulting', body: 'Help mapping where AI can genuinely add value in your product or operations — and where it cannot.' },
    ]}
    technologies={['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'HuggingFace', 'MLflow', 'Vertex AI', 'SageMaker', 'FastAPI', 'Pinecone', 'Weaviate']}
  />
}
