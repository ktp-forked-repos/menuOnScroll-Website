# Change Compass configuration
compass_config do |config|
  config.output_style = :compact
end

# Reload the browser automatically whenever files change
activate :livereload

activate :bower

set :css_dir, 'assets/css'

set :js_dir, 'assets/js'

set :images_dir, 'assets/img'

set :fonts_dir, 'assets/fonts'

# Add bower's directory to sprockets asset path
after_configuration do
  @bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
  sprockets.append_path File.join "#{root}", @bower_config["directory"]
end

activate :syntax

# Build-specific configuration
configure :build do

  # For example, change the Compass output style for deployment
  activate :minify_css

  # # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

end
