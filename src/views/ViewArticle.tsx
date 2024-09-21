import React from 'react'
import { ArrowLeft, Calendar, User, Tag, Eye, ThumbsUp, MessageSquare, Share2 } from 'lucide-react'

const ViewArticlePage = () => {
  const article = {
    title: "10 Easy-to-Grow Houseplants for Beginners",
    author: "John Doe",
    date: "May 15, 2023",
    category: "Indoor Plants",
    tags: ["Beginner", "Houseplants", "Low Maintenance"],
    views: 1234,
    likes: 89,
    comments: 23,
    content: `
      <p>Indoor plants are a great way to add life and color to your home while improving air quality. If you're new to plant parenthood, don't worry! Here are 10 easy-to-grow houseplants that are perfect for beginners:</p>
      
      <h2>1. Snake Plant (Sansevieria)</h2>
      <p>Also known as mother-in-law's tongue, this plant is nearly indestructible. It thrives in low light and doesn't need frequent watering.</p>
      
      <h2>2. Pothos (Epipremnum aureum)</h2>
      <p>This trailing plant is perfect for hanging baskets or as a climbing plant. It's very forgiving and can tolerate a wide range of light conditions.</p>
      
      <h2>3. Spider Plant (Chlorophytum comosum)</h2>
      <p>Known for its air-purifying qualities, the spider plant is easy to care for and produces baby plants that can be propagated.</p>
      
      <h2>4. ZZ Plant (Zamioculcas zamiifolia)</h2>
      <p>This plant can tolerate neglect and low light conditions, making it perfect for offices or dark corners of your home.</p>
      
      <h2>5. Rubber Plant (Ficus elastica)</h2>
      <p>With its large, glossy leaves, the rubber plant makes a striking addition to any room. It's relatively low-maintenance and can grow quite tall.</p>
    `,
    image: "/placeholder.svg?height=400&width=800"
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button className="flex items-center text-[#0096c7] hover:text-[#00b4d8] transition duration-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Articles
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <User size={16} className="mr-2" />
                {article.author}
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Calendar size={16} className="mr-2" />
                {article.date}
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Tag size={16} className="mr-2" />
                {article.category}
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Eye size={16} className="mr-2" />
                {article.views} views
              </div>
            </div>
            
            <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: article.content }} />
            
            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <button className="flex items-center text-gray-600 hover:text-[#0096c7] transition duration-300">
                  <ThumbsUp size={20} className="mr-2" />
                  {article.likes} Likes
                </button>
                <button className="flex items-center text-gray-600 hover:text-[#0096c7] transition duration-300">
                  <MessageSquare size={20} className="mr-2" />
                  {article.comments} Comments
                </button>
              </div>
              <div>
                <button className="flex items-center text-gray-600 hover:text-[#0096c7] transition duration-300">
                  <Share2 size={20} className="mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
          <div className="flex flex-wrap">
            {article.tags.map((tag, index) => (
              <span key={index} className="bg-[#e0f7fa] text-[#0096c7] px-3 py-1 rounded-full text-sm mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewArticlePage