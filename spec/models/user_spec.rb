require 'rails_helper'

RSpec.describe User, type: :model do
  it 'registers a valid user' do
    expect(User.new(test_user)).to be_valid
  end

  it 'does not register a user with missing email' do
    expect(User.new(test_user(email: nil))).to be_invalid
    expect(User.new(test_user(email: ''))).to be_invalid
  end

  it 'does not register a user with duplicate email' do
    User.create(test_user(email: 'test@example.com'))
    expect(User.new(test_user(email: 'test@example.com'))).to be_invalid
  end

  it 'does not register a user with bad email' do
    expect(User.new(test_user(email: 'example.com'))).to be_invalid
    expect(User.new(test_user(email: 'test@example'))).to be_invalid
  end

  it 'downcases email addresses' do
    user = User.new(test_user(email: 'tEsT@ExAmPlE.cOm'))
    expect(user).to be_valid
    user.save
    expect(user.email).to eq 'test@example.com'
  end

  it 'does not register a user with different password and confirmation' do
    expect(
      User.new(
        test_user(
          password: 'passw0rd',
          password_confirmation: 'passw0rd1'
        )
      )
    ).to be_invalid
  end

  it 'does not register a user with empty password' do
    expect(
      User.new(
        test_user(
          password: '',
          password_confirmation: ''
        )
      )
    ).to be_invalid
  end

  it 'does not register a user without username' do
    expect(User.new(test_user(username: nil))).to be_invalid
    expect(User.new(test_user(username: ''))).to be_invalid
  end

  it 'does not register a user with a duplicate username' do
    User.create(test_user(username: 'Test user', email: 'a@b.com'))
    expect(
      User.new(
        test_user(
          username: 'Test user',
          email: 'c@d.com'
        )
      )
    ).to be_invalid
    expect(
      User.new(
        test_user(
          username: 'test user',
          email: 'c@d.com'
        )
      )
    ).to be_invalid
  end

  def test_user options = {}
    {
      username: 'Test user',
      email: 'test@example.com',
      password: 'passw0rd',
      password_confirmation: 'passw0rd'
    }.merge options
  end
end
