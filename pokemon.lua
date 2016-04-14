function read_file(filename)
    local input = io.open(filename, 'r')
    if input ~= nil then
        io.input(input)
        input_content = io.read()
        io.close(input)

        return input_content
    end

    return nil
end

function file_exists(filename)
    f = io.open(filename, 'r')

    if f ~= nil then
        io.close(f)
        return true
    else
        io.close(f)
        return false
    end
end

function press_button(button)
    input_table = {}
    input_table[button] = true
    joypad.set(1, input_table)
end

function has_value (tab, val)
    for index, value in ipairs (tab) do
        if value == val then
            return true
        end
    end

    return false
end

gb_buttons = {'A', 'B', 'up', 'down', 'left', 'right', 'start', 'select'}

while true do
    button = read_file('button.txt')
    if button ~= nil then
        if has_value(gb_buttons, button) then
            press_button(button)
            emu.message('Pressing: ' .. button)
            os.remove('button.txt')
        end
    end

    emu.frameadvance()
end
