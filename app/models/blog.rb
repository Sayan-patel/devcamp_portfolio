class Blog < ApplicationRecord
	enum status: {DRAFT: 0, PUBLISH: 1}
	extend FriendlyId
	friendly_id :title, use: :slugged

	validates_presence_of :title, :body, :topic
	has_many :comments, dependent: :destroy

	belongs_to :topic, optional: true

	def self.recent
		order("created_at DESC")
	end
end
