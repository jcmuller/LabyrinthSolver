namespace :cleanup do
  desc "Clean backup and swap files, and artifacts"
  task :files do
    require "fileutils"
    Dir["{pkg/*,**/*~,**/.*.sw?,coverage/**,spec/reports/**}"].each do |file|
      rm_rf file
    end
  end
end
