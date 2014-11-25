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
  # activate :minify_javascript

  # Enable cache buster
  #activate :asset_hash

  # Use relative URLs
  activate :relative_assets

end

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = '' # The name of the S3 bucket you are targetting. This is globally unique.
  s3_sync.region                     = 'us-west-2'     # The AWS region for your bucket.
  s3_sync.aws_access_key_id          = ''
  s3_sync.aws_secret_access_key      = ''
  s3_sync.delete                     = false # We delete stray files by default.
  s3_sync.after_build                = false # We chain after the build step by default. This may not be your desired behavior...
  s3_sync.prefer_gzip                = true
  s3_sync.path_style                 = true
  s3_sync.reduced_redundancy_storage = false
  s3_sync.acl                        = 'public-read'
  s3_sync.encryption                 = false
end
