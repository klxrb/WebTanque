require 'rtanque/runner'

namespace :battle do
  desc "Create a new battle"
  task :create, [:file] => [:environment] do |t, args|
    runner = RTanque::Runner.new(1200, 700, 5000, nil)
    File.open(args[:file], 'r').each_line do |line|
      runner.add_brain_path(line.chomp)
    end
    runner.start(false)
    File.open(args[:file], 'w') do |f|
      f.puts runner.match.match_data.to_json
    end
  end
end
