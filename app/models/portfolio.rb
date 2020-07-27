class Portfolio < ApplicationRecord
	validates_presence_of :title, :body, :main_image, :thumb_image

	def self.angular
		where(subtitle: 'Angular')
	end

	scope :ruby_on_rails_portfolio_items, -> {where(subtitle: 'My great service')}

	after_initialize :set_defaults

	def set_defaults
		self.main_image ||= "https://via.placeholder.com/300"
		self.thumb_image ||= "https://via.placeholder.com/150"
	end
end
