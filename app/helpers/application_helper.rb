module ApplicationHelper
  def javascript(*args)
    content_for :javascripts do
      javascript_include_tag(*args)
    end
  end
end
