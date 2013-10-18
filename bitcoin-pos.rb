require 'bundler'
Bundler.require

require 'open-uri'

before do
  cache_control :public, :must_revalidate, :max_age => 60
end

get '/' do
  erb :index
end

get '/bitstamp' do
  uri = URI.parse("https://www.bitstamp.net/api/ticker/")
  data = JSON.parse(uri.read)
  data['last']
end